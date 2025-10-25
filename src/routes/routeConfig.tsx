import { ComponentType, lazy } from "react";

// Actual page components
const Home = lazy(() => import("../pages/Home"));
const Store = lazy(() => import("../pages/Store"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Contest = lazy(() => import("../pages/Contest"));
const Community = lazy(() => import("../pages/Community"));
const Apps = lazy(() => import("../pages/Apps"));
const Gamewear = lazy(() => import("../pages/Gamewear"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Placeholder component for routes under construction
const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

const ProductDetail = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Product Detail" />,
  })
);

const Cart = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Cart" />,
  })
);

const Checkout = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Checkout" />,
  })
);

const SignIn = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Sign In" />,
  })
);

const SignUp = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Sign Up" />,
  })
);

const Dashboard = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Dashboard" />,
  })
);

const Profile = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Profile" />,
  })
);

const Orders = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Orders" />,
  })
);

const Wishlist = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Wishlist" />,
  })
);

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
  isPrivate: boolean;
  exact?: boolean;
}

// Public routes - accessible without authentication
export const publicRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    path: "/store",
    component: Store,
    isPrivate: false,
  },
  {
    path: "/gallery",
    component: Gallery,
    isPrivate: false,
  },
  {
    path: "/contest",
    component: Contest,
    isPrivate: false,
  },
  {
    path: "/community",
    component: Community,
    isPrivate: false,
  },
  {
    path: "/apps",
    component: Apps,
    isPrivate: false,
  },
  {
    path: "/gamewear",
    component: Gamewear,
    isPrivate: false,
  },
  // extra routes can be added here
  {
    path: "/product/:id",
    component: ProductDetail,
    isPrivate: false,
  },
  {
    path: "/cart",
    component: Cart,
    isPrivate: false,
  },
  {
    path: "/checkout",
    component: Checkout,
    isPrivate: false,
  },
  {
    path: "/signin",
    component: SignIn,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: SignUp,
    isPrivate: false,
  },
];

// Private routes - require authentication
export const privateRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/profile",
    component: Profile,
    isPrivate: true,
  },
  {
    path: "/orders",
    component: Orders,
    isPrivate: true,
  },
  {
    path: "/wishlist",
    component: Wishlist,
    isPrivate: true,
  },
  {
    path: "/cart",
    component: Cart,
    isPrivate: true,
  },
  {
    path: "/checkout",
    component: Checkout,
    isPrivate: true,
  },
];

// Special routes
export const specialRoutes: RouteConfig[] = [
  {
    path: "*",
    component: NotFound,
    isPrivate: false,
  },
];

// Navigation Routes - Common navigation items for both desktop and mobile navbars
export interface NavigationRoute {
  label: string;
  path: string;
  external?: boolean;
  target?: string;
  rel?: string;
}

export const navigationRoutes: NavigationRoute[] = [
  {
    label: "Store",
    path: "/store",
  },
  {
    label: "Gallery",
    path: "/gallery",
  },
  {
    label: "Contest",
    path: "/contest",
  },
  {
    label: "Community",
    path: "/community",
  },
  {
    label: "Apps",
    path: "/apps",
  },
  {
    label: "Gamewear",
    path: "https://connect.clo-set.com/gamewear/inzoi",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
