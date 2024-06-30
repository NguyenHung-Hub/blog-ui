const routes = {
  post: "/bai-viet",
  dashboard: "/dashboard",
  postDashboard: "/dashboard/post",
  resourceDashboard: "/dashboard/resource",
  profileDashboard: "/dashboard/profile",
};

const env = {
  API_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

const cfg = {
  routes,
  env,
};

export default cfg;
