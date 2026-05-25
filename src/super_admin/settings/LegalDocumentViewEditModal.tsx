"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import TipTapEditor from "@/tiptap/TipTapEditor"

import type { LegalDocumentRow } from "./legal-documents.types"

export type LegalDocumentModalMode = "view" | "edit"

export type LegalDocumentViewEditModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    doc: LegalDocumentRow | null
    mode: LegalDocumentModalMode
    onSave?: (docId: string, bodyHtml: string) => void
}

function statusBadge(status: LegalDocumentRow["status"]) {
    if (status === "published") {
        return (
            <Badge
                variant="outline"
                className="border-0 bg-emerald-50 font-medium capitalize text-emerald-700"
            >
                published
            </Badge>
        )
    }
    return (
        <Badge
            variant="outline"
            className="border-0 bg-amber-50 font-medium capitalize text-amber-800"
        >
            draft
        </Badge>
    )
}

export default function LegalDocumentViewEditModal({
    open,
    onOpenChange,
    doc,
    mode,
    onSave,
}: LegalDocumentViewEditModalProps) {
    const [draftHtml, setDraftHtml] = React.useState("")

    React.useEffect(() => {
        if (open && doc && mode === "edit") {
            setDraftHtml(doc.bodyHtml)
        }
    }, [open, doc, mode])

    const handleSave = () => {
        if (!doc) return
        onSave?.(doc.slug, draftHtml)
        onOpenChange(false)
    }

    const isEdit = mode === "edit"

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {doc ? (
          <DialogContent
            showCloseButton
            className="flex max-h-[min(90vh,900px)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
          >
            <DialogHeader className="shrink-0 space-y-2 border-b border-border px-4 py-4 pr-12 text-left sm:px-6">
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="text-lg font-semibold text-gray-700 ">
                  {doc.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs sm:text-sm text-gray-700">
                {isEdit
                  ? "Edit the legal document below. Use the toolbar for formatting."
                  : "Read-only preview of this legal document."}
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {isEdit ? (
                <TipTapEditor
                  key={`${doc.id}-edit`}
                  content={draftHtml}
                  onChange={setDraftHtml}
                  placeholder="Enter legal copy…"
                  minHeight="min-h-[320px]"
                  className="min-h-[360px] border-border bg-gray-100/80 text-gray-700 placeholder:text-gray-700"
                />
              ) : (
                <TipTapEditor
                  key={`${doc.id}-view`}
                  content={doc.bodyHtml}
                  onChange={() => {}}
                  editable={false}
                  showToolbar={false}
                  showCharacterCount={false}
                  minHeight="min-h-[320px]"
                  className="min-h-[360px] border-border "
                />
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-border bg-muted/30 px-4 py-4 sm:px-6 ">
              {isEdit ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="hover:bg-black hover:text-white"
                  >
                    Save changes
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="bg-black hover:bg-gray-200/80 hover:text-gray-700"
                >
                  Close
                </Button>
              )}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    );
}
