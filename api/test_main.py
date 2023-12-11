from os import link
from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


SMALL_PROGRAM = '''"""Hello world"""


def main():
    """Hello world"""
    print("hi" + "bye")


main()
'''

SMALL_PROGRAM_MIN = """def main():
    print("hi"+"bye")
main()"""

SMALL_PROGRAM_MIN_TINY = """def main():
 print("hi"+"bye")
main()"""


def test_minimise_code():
    response = client.post(
        url="/minimise/",
        json={"code": SMALL_PROGRAM, "lang": "python3", "indentation": "    "},
    )
    assert response.status_code == 200
    assert response.json() == {"lang": "python3", "code": SMALL_PROGRAM_MIN}

    response = client.post(
        url="/minimise/",
        json={"code": SMALL_PROGRAM, "lang": "python3", "indentation": " "},
    )
    assert response.status_code == 200
    assert response.json() == {"lang": "python3", "code": SMALL_PROGRAM_MIN_TINY}


def test_minimise_code_and_get_link():
    response = client.post(
        url="/minimise/link/",
        json={"code": SMALL_PROGRAM, "lang": "python3", "indentation": "    "},
    )
    assert response.status_code == 200
    assert response.json() == {
        "lang": "python3",
        "code": SMALL_PROGRAM_MIN,
        "link": "https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false&code=def+main%28%29%3A%0A++++print%28%22hi%22%2B%22bye%22%29%0Amain%28%29",
    }

    response = client.post(
        url="/minimise/link/",
        json={
            "code": SMALL_PROGRAM,
            "lang": "python3",
            "indentation": " ",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "lang": "python3",
        "code": SMALL_PROGRAM_MIN_TINY,
        "link": "https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false&code=def+main%28%29%3A%0A+print%28%22hi%22%2B%22bye%22%29%0Amain%28%29",
    }
