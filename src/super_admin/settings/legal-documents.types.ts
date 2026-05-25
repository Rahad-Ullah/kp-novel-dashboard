export type LegalDocStatus = "published" | "draft"

export type LegalDocumentRow = {
  id: string
  title: string
  slug: string
  status: string
  /** Rich HTML body (TipTap / stored legal copy). */
  bodyHtml: string
}
