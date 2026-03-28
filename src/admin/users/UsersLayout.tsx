"use client";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import UsersTable from "./UsersTable";

function UsersLayout() {
  const search = {
    placeholder: "Search",
    value: "",
    onChange: (value: string) => {
      console.log(value);
    },
  };
  const selects = [
    {
      placeholder: "Select",
      options: ["Option 1", "Option 2", "Option 3"],
      value: "",
      onValueChange: (value: string) => {
        console.log(value);
      },
    },
    {
      placeholder: "Select",
      options: ["Option 1", "Option 2", "Option 3"],
      value: "",
      onValueChange: (value: string) => {
        console.log(value);
      },
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo title="User Management" description="View and manage platform users" />
      <FilterSearch search={search} selects={selects} />
      <UsersTable />
    </div>
  );
}

export default UsersLayout;
