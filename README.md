# Minimise Python Tutor

Sometimes Python code examples are too long to create a sharable python tutor link due to long docstrings or whitepsace.
Minimise for Python Tutor shortens code and generates a sharable Python Tutor link for long Python3 code.

## Runing

### API

To get started activate venv (optional):

```
python -m venv env
source env/bin/activate
```

Starting server:

```
pip install -r api/requirements.txt
cd api
uvicorn main:app --reload

```

### App

```
cd app
pnpm install
pnpm run dev
```
