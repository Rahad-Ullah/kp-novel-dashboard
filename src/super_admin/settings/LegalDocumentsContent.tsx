"use client"

import * as React from "react"
import { EyeIcon, FileText, SquarePen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import LegalDocumentViewEditModal, {
  type LegalDocumentModalMode,
} from "./LegalDocumentViewEditModal"
import type { LegalDocStatus, LegalDocumentRow } from "./legal-documents.types"
import { nextFetch } from "@/utils/nextFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTag";

export type { LegalDocumentRow, LegalDocStatus } from "./legal-documents.types"

function countWordsFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  if (!text) return 0
  return text.split(/\s+/).length
}

function statusBadge(status: LegalDocStatus) {
  if (status === "published") {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-emerald-50 font-medium capitalize text-emerald-700"
      >
        published
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="border-0 bg-amber-50 font-medium capitalize text-amber-800"
    >
      draft
    </Badge>
  );
}

export function LegalDocumentsContent({ data }: { data: any }) {
  const initialDocuments: LegalDocumentRow[] = [
    {
      id: "1",
      title: "Terms of Service",
      slug: "termsOfService",
      status: "published",
      bodyHtml: data?.termsOfService,
    },
    {
      id: "2",
      title: "Privacy Policy",
      slug: "privacyPolicy",
      status: "published",
      bodyHtml: data?.privacyPolicy,
    },
    {
      id: "3",
      title: "Support",
      slug: "support",
      status: "published",
      bodyHtml: data?.support,
    },
    {
      id: "4",
      title: "About Us",
      slug: "aboutUs",
      status: "published",
      bodyHtml: data?.aboutUs,
    },
  ];

  const [documents, setDocuments] =
    React.useState<LegalDocumentRow[]>(initialDocuments);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeDoc, setActiveDoc] = React.useState<LegalDocumentRow | null>(
    null,
  );
  const [modalMode, setModalMode] =
    React.useState<LegalDocumentModalMode>("view");

  const openModal = (doc: LegalDocumentRow, mode: LegalDocumentModalMode) => {
    setActiveDoc(doc);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) setActiveDoc(null);
  };

  const handleSave = async (docType: string, bodyHtml: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.slug === docType ? { ...doc, bodyHtml } : doc)),
    );

    toast.loading("Updating...", {
      id: "legal-document-update",
    });
    try {
      const res = await nextFetch(`/setting`, {
        method: "PATCH",
        body: {
          [docType]: bodyHtml,
        },
      });
      if (res.success) {
        revalidate("settings");
        toast.success("Updated successfully", {
          id: "legal-document-update",
        });
      } else {
        toast.error("Failed to update legal document", {
          id: "legal-document-update",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update legal document", {
        id: "legal-document-update",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-xl border border-gray-200 bg-white py-5 shadow-none ring-0">
        <CardHeader className="px-5 pb-0 pt-0">
          <CardTitle className="text-base font-bold text-gray-900">
            Legal Documents
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Modify or update terms of service, privacy policies, and other legal
            documents
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
          >
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <FileText className="size-6" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {doc.title}
                  </span>
                  {statusBadge("published")}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 gap-2 rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                onClick={() => openModal(doc, "view")}
              >
                <EyeIcon className="size-4" />
                View
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 gap-2 rounded-lg border-gray-200 bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-700"
                onClick={() => openModal(doc, "edit")}
              >
                <SquarePen className="size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <LegalDocumentViewEditModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        doc={activeDoc}
        mode={modalMode}
        onSave={handleSave}
      />
    </div>
  );
}
