import { ComponentType, lazy } from "react";

// Actual page components
const Home = lazy(() => import("../pages/Home"));
const Store = lazy(() => import("../pages/Store"));

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

const Login = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Login" />,
  })
);

const Register = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="Register" />,
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

const NotFound = lazy(() =>
  Promise.resolve({
    default: () => <PlaceholderPage title="404 - Page Not Found" />,
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
    path: "/product/:id",
    component: ProductDetail,
    isPrivate: false,
  },
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    component: Register,
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
