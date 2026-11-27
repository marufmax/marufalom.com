# maruf.blog ⚡️

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) with [Contentlayer](https://www.contentlayer.dev/)

## Running Locally

### Installation

1. Clone this repo

```bash
git clone git@github.com:marufmax/marufalom.com.git
```

2. Change directory

```sh
cd marufalom.com
```

3. Install yarn packages

```bash
yarn
```

1. Create a `.env.local` file following the `.env.example`

```bash
cp .env.example .env.local
```

6. Run the development server

```bash
yarn dev
```

## Resume

The resume page is `public/resume.html`. After editing it, regenerate the PDF:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=public/static/Maruf-Alom-Resume.pdf "file://$PWD/public/resume.html"
```
