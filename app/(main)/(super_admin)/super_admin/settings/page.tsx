import SettingsLayout from "@/src/super_admin/settings/SettingsLayout";
import { nextFetch } from "@/utils/nextFetch";

async function SettingsPage() {
  const res = await nextFetch(`/setting`, {
    tags: ["settings"],
  });

  const faqRes = await nextFetch(`/faq`, {
    tags: ["faq"],
  });

  return (
    <SettingsLayout
      data={res?.data}
      faqData={{ faqs: faqRes?.data, meta: faqRes?.meta }}
    />
  );
}

export default SettingsPage;
