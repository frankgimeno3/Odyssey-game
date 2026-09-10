This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Resultados compartidos con Pompeia

Odyssey guarda, consulta en tiempo real y borra registros en la colección `documents`
del proyecto Firestore `pompeiaquizz`, la misma colección que utiliza pompeiagame.
Los registros nuevos incluyen `nombre`, `midios`, `lang`, `updatedAt` (ISO) e `id`.
El identificador se guarda en una sola escritura y se conserva al reintentar.

La configuración local está en `.env.local` (ignorado por Git). `.env.example`
indica las seis variables `NEXT_PUBLIC_FIREBASE_*` necesarias. En Vercel deben
configurarse con los mismos valores de la aplicación web Firebase de Pompeia
antes de construir y desplegar de nuevo; `.env.local` no se sube con Git.

El printer recibe altas y bajas sin recargar. Un fallo de lectura muestra un error,
y un fallo al guardar no avanza a la confirmación de recogida. El borrado afecta a
la colección compartida y, por tanto, también a los registros visibles en Pompeia.
Los resultados antiguos de `localStorage` no se importan automáticamente.

Se utilizan los permisos existentes de Firestore; el acceso local del juego no
crea una sesión de Firebase Authentication. No se han modificado las reglas de
la base de datos.
