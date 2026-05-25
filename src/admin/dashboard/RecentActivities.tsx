function RecentActivities({ data }: { data: any }) {
  return (
    <section className="space-y-2">
      <h3 className="text-3xl font-semibold text-gray-900">
        Recent Activities
      </h3>

      <div className="rounded-2xl bg-linear-to-r from-blue-700 via-indigo-600 to-purple-600 p-4 shadow-sm">
        <div className="space-y-3">
          {data?.map((activity: any) => (
            <article
              key={activity.id}
              className="flex items-center gap-4 rounded-xl bg-white/20 px-5 py-4 text-white"
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-white" />

              <div className="space-y-1">
                <p className="text-xl font-medium leading-tight">
                  {activity.title}
                </p>
                <p className="text-base text-white/90">{activity.details}</p>
                <p className="text-base text-white/90">
                  • {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentActivities;
