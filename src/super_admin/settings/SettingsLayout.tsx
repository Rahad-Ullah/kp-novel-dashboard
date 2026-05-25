"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GeneralSettingsContent } from "./GeneralSettingsContent";
import { LegalDocumentsContent } from "./LegalDocumentsContent";
import FaqContent from "./FaqContent";

function SettingsLayout({ data, faqData }: { data: any; faqData: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-base text-gray-500">
          Manage platform configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full gap-6">
        <TabsList className="inline-flex h-11 items-center justify-center gap-1  border border-gray-200 bg-gray-50/90  shadow-none">
          <TabsTrigger
            value="general"
            className=" px-5 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 shadow-none transition-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className=" px-5 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 shadow-none transition-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Legal Documents
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className=" px-5 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 shadow-none transition-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0 outline-none">
          <GeneralSettingsContent data={data} />
        </TabsContent>
        <TabsContent value="legal" className="mt-0 outline-none">
          <LegalDocumentsContent data={data} />
        </TabsContent>
        <TabsContent value="faq" className="mt-0 outline-none">
          <FaqContent faqData={faqData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsLayout;
