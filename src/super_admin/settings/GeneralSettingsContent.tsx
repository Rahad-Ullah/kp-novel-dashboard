"use client";

import { useState, type ReactNode } from "react";
import { FileText, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { nextFetch } from "@/utils/nextFetch";

function SettingRowCard({
  icon,
  label,
  description,
  field,
  action,
}: {
  icon: ReactNode;
  label: string;
  description: string;
  field: ReactNode;
  action: ReactNode;
}) {
  return (
    <Card className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex shrink-0 text-blue-600">{icon}</div>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="font-semibold text-gray-900">{label}</p>
            <p className="mt-0.5 text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">{field}</div>
            <div className="shrink-0">{action}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function GeneralSettingsContent({ data }: { data: any }) {
  const [logo, setLogo] = useState(data?.logo);
  const [platformName, setPlatformName] = useState(data?.platformName);

  const handleLogoChange = async () => {
    toast.loading("Updating logo...", {
      id: "logo",
    });
    try {
      const res = await nextFetch(`/setting`, {
        method: "PATCH",
        body: { logo },
      });
      if (res?.success) {
        toast.success("Logo updated successfully", {
          id: "logo",
        });
      } else {
        toast.error(res?.message, {
          id: "logo",
        });
      }
    } catch (error) {
      toast.error("Failed to update logo", {
        id: "logo",
      });
    }
  };

  const handlePlatformNameChange = async () => {
    toast.loading("Updating platform name...", {
      id: "platformName",
    });
    try {
      const res = await nextFetch(`/setting`, {
        method: "PATCH",
        body: { platformName },
      });
      if (res?.success) {
        toast.success("Platform name updated successfully", {
          id: "platformName",
        });
      } else {
        toast.error(res?.message, {
          id: "platformName",
        });
      }
    } catch (error) {
      toast.error("Failed to update platform name", {
        id: "platformName",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-xl border border-gray-200 bg-white py-5 shadow-none ring-0">
        <CardHeader className="px-5 pb-0 pt-0">
          <CardTitle className="text-base font-bold text-gray-900">
            Platform Branding
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Control logos, images, text, and other assets used within the
            platform
          </CardDescription>
        </CardHeader>
      </Card>

      <SettingRowCard
        icon={<ImageIcon className="size-6" />}
        label="Main Logo"
        description="Primary logo used in navigation and marketing"
        field={
          <Input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="h-10 rounded-lg border-gray-200 bg-gray-50 text-gray-700"
          />
        }
        action={
          <Button
            type="button"
            onClick={handleLogoChange}
            className="h-10 rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700"
          >
            Save
          </Button>
        }
      />

      <SettingRowCard
        icon={<FileText className="size-6" strokeWidth={1.5} />}
        label="Application Name"
        description="Displayed in page titles and headers"
        field={
          <Input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="h-10 rounded-lg border-gray-200 bg-gray-50 text-gray-700"
          />
        }
        action={
          <Button
            type="button"
            onClick={handlePlatformNameChange}
            className="h-10 rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700"
          >
            Save
          </Button>
        }
      />
    </div>
  );
}
