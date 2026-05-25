"use client";

import * as React from "react";
import { HelpCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/utils/revalidateTag";

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  updatedAt: string;
};

export default function FaqContent({ faqData }: { faqData: any }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<FaqItem | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<FaqItem | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditingItem(null);
  };

  const handleSaveFaq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = (formData.get("question") as string).trim();
    const answer = (formData.get("answer") as string).trim();
    if (!question || !answer) return;

    const toastId = "faq-save";
    toast.loading(editingItem ? "Updating FAQ..." : "Creating FAQ...", {
      id: toastId,
    });

    const res = await nextFetch(
      editingItem ? `/faq/${editingItem._id}` : `/faq/create-faq`,
      {
        method: editingItem ? "PATCH" : "POST",
        body: { question, answer },
      },
    );

    if (res?.success) {
      toast.success(editingItem ? "FAQ updated" : "FAQ created", {
        id: toastId,
      });
      revalidate("faq");
      handleFormOpenChange(false);
    } else {
      toast.error(res?.message || "Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const toastId = "faq-delete";
    toast.loading("Deleting FAQ...", { id: toastId });

    const res = await nextFetch(`/faq/${deleteTarget._id}`, {
      method: "DELETE",
    });

    if (res?.success) {
      toast.success("FAQ deleted", { id: toastId });
      revalidate("faq");
      setDeleteTarget(null);
    } else {
      toast.error(res?.message || "Failed to delete", { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-xl border border-gray-200 bg-white py-5 shadow-none ring-0">
        <CardHeader className="flex flex-col gap-4 px-5 pb-0 pt-0 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold text-gray-900">
              Frequently asked questions
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Add, edit, or remove questions and answers shown to users.
            </CardDescription>
          </div>
          <Button
            type="button"
            className="h-9 shrink-0 gap-2 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
            onClick={openCreate}
          >
            <Plus className="size-4" />
            Add FAQ
          </Button>
        </CardHeader>
      </Card>

      {!faqData?.faqs?.length ? (
        <Card className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-10 shadow-none ring-0">
          <CardContent className="flex flex-col items-center justify-center gap-3 px-5 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <HelpCircle className="size-6" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-gray-800">No FAQs yet</p>
            <p className="max-w-sm text-sm text-gray-500">
              Create your first question and answer. You can edit or delete
              entries anytime.
            </p>
            <Button
              type="button"
              className="mt-1 h-9 gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={openCreate}
            >
              <Plus className="size-4" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {faqData.faqs.map((item: FaqItem) => (
            <Card
              key={item._id}
              className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  <HelpCircle className="size-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="font-semibold text-gray-900">{item.question}</p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </div>
                <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 gap-2 rounded-lg border-gray-200 bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-700"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 gap-2 rounded-lg border-red-200 bg-red-50/80 text-red-700 hover:bg-red-100 hover:text-red-800"
                    onClick={() => setDeleteTarget(item)}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit dialog */}
      <Dialog open={formOpen} onOpenChange={handleFormOpenChange}>
        <DialogContent
          className="max-h-[min(90vh,640px)] gap-0 overflow-y-auto sm:max-w-lg"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              {editingItem ? "Edit FAQ" : "New FAQ"}
            </DialogTitle>
            <DialogDescription>
              Enter a clear question and a helpful answer. Both fields are
              required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveFaq} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="faq-question">Question</Label>
              <Input
                id="faq-question"
                name="question"
                defaultValue={editingItem?.question ?? ""}
                placeholder="e.g. How do I reset my password?"
                className="rounded-lg border-gray-200"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="faq-answer">Answer</Label>
              <textarea
                id="faq-answer"
                name="answer"
                defaultValue={editingItem?.answer ?? ""}
                placeholder="Write the answer users will see…"
                rows={6}
                required
                className={cn(
                  "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-[120px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                )}
              />
            </div>
            <div className="flex flex-row justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                onClick={() => handleFormOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Delete this FAQ?
            </DialogTitle>
            <DialogDescription>
              This removes &quot;{deleteTarget?.question.slice(0, 80)}
              {deleteTarget && deleteTarget.question.length > 80 ? "…" : ""}
              &quot; from the list. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-lg bg-red-600 text-white hover:bg-red-700 hover:text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
