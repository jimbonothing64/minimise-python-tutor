from tokenize import TokenError
from typing import Union
from enum import Enum
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from minimizer import minimize
from urllib import parse
from fastapi.middleware.cors import CORSMiddleware


PY_TUTOR_BASEURL = "https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"


class SupportedLangauge(str, Enum):
    python3 = "python3"


class Code(BaseModel):
    code: str
    lang: SupportedLangauge


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/languages/")
def get_supported_langauges():
    return [lang for lang in SupportedLangauge]


@app.post("/minimise/")
def minimise_code(code: Code):
    if code.lang == SupportedLangauge.python3:
        try:
            minimise_code = minimize(code.code)
            return {"lang": code.lang, "code": minimise_code}
        except TokenError:
            pass  # Failed to minimise.

    raise HTTPException(
        status_code=400,
        detail=f"Failed to minmise code. Check code is syntacticly valid {code.lang.name}",
    )


@app.post("/minimise/link/")
def minimise_code_and_get_link(code: Code):
    minimised = minimise_code(code)
    url = PY_TUTOR_BASEURL + "&" + parse.urlencode({"code": minimised["code"]})
    return {"lang": minimised["lang"], "code": minimised["code"], "link": url}
