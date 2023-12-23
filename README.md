# Minimise for Python Tutor
Python code can become too long for Python Tutor due to comments, docscrings and extra spaces.
Minimise for Python Tutor shortens code and generates a sharable link for long Python code.

# Usage
1. Enter your code into the textbox.
2. If your code is very long tick `tiny indent` to minimise it further.
3. Press `Get link`.
4. Your minimised code will apear below. You can either `Copy` the link or `Visit` it directly.
5. If you want to see your minimised code You can press `Show Code`.

# About
The app is located in `/app` and uses sveltekit (TypeScript). It does SSR and has an intuitive UI thanks to flowbite & tailwind. It validates form data and sends it to the API.

The API is located in `/api` and uses fastAPI (Python). This is because the minimisation library is in Python and it provides built-in data validation.

# Runing
You must run both the API and the App.

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
