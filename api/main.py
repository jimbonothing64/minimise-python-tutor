from tokenize import TokenError
from typing import Union
from enum import Enum
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from minimizer import minimize
from urllib import parse
from fastapi.middleware.cors import CORSMiddleware


PY_TUTOR_BASEURL = "https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"


class SupportedLangauge(str, Enum):
    python3 = "python3"


class Indentation(str, Enum):
    normal = "    "
    tiny = " "
    tab = "\t"


class Code(BaseModel):
    code: str
    lang: SupportedLangauge
    indentation: Indentation


app = FastAPI(
    title="Minimise for Python Tutor API",
    summary="Minimise for Python Tutor shortens code and generates a sharable Python Tutor link for long Python3 code.",
)


@app.get("/", include_in_schema=False)
async def docs_redirect():
    return RedirectResponse(url="/docs")


@app.get("/languages/")
def get_supported_langauges():
    return [lang for lang in SupportedLangauge]


@app.post("/minimise/")
def minimise_code(code: Code):
    if code.lang == SupportedLangauge.python3:
        try:
            minimise_code = minimize(
                code.code, indent_char=code.indentation
            )  # Python tutor replaces tabs with spaces.
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
