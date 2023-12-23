# Minimise Python Tutor
Python code can become too long for Python Tutor due to comments, docscrings and extra spaces.
Minimise for Python Tutor shortens code and generates a sharable link for long Python code.

# Using
1. Enter your code into the textbox.
2. If your code is very long tick `tiny indent` to minimise it further.
3. Press `Get link`.
4. Your minimised code will apear below. You can either `Copy` the link or `Visit` it directly.
5. If you want to see your minimised code You can press `Show Code`.

# About
The frontend, in `/app`, is made with sveltekit (TypeScript). It uses SSR, is quick to build an intuitive UI with using flowbite and handles forms intuitively.
The backend, in `/api`, is made with fastAPI (Python) because the minimisation library is in python and it provides built in data validation.

# Runing
You need to run both the API and the App.

### API
To get started activate venv (optional):
```
python -m venv env
source env/bin/activate
```

Starting the server:
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
