<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep commerce integration behind documented `src/services/*Service.ts` Axios placeholders; the storefront uses local catalog data until the user's Express API exists.
  Why: The requested deliverable is frontend-only while preserving a clear future backend boundary.
- Use TanStack file routes rather than React Router DOM in this project.
  Why: TanStack Start is the supported project runtime and provides equivalent client navigation with SSR metadata.
