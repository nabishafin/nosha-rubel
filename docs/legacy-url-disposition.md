# Legacy URL disposition

Legacy URLs must receive one intentional response. Do not redirect unrelated URLs to a homepage.

| URL family | Current disposition | Reason | Future action |
| --- | --- | --- | --- |
| `/category/*` | `410 Gone` | Stale generic category pages have no equivalent dossier page. | Add a one-to-one `301` only when a genuinely equivalent replacement is approved. |
| `/:lang/category/*` | `410 Gone` | Localized legacy category shells have no equivalent dossier page. | Add a one-to-one `301` only when a genuinely equivalent replacement is approved. |
| `/:lang/search?...` | `200` with `noindex, follow` | Search remains useful to people but must not compete in the index. | Keep out of XML sitemaps. |
| `/:lang/translation-unavailable?...` | `200` with `noindex, follow` | Explicit user-facing fallback, not indexable content. | Keep out of XML sitemaps. |

No RSS or Atom endpoint is published currently. A feed should be added only when there is a maintained first-party publication stream with stable internal records and an assigned editorial owner.

Before adding any migration redirect, record:

1. Old absolute URL.
2. Controlled hostname and ownership evidence.
3. Current traffic, backlinks and indexation state.
4. Closest equivalent canonical URL.
5. Intended response (`301`, `410`, or retained `200`).
6. Approval owner and date.
7. Validation result proving a single hop with no chain or loop.
