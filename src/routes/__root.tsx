import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/Graph/widget/DefaultCatchBoundary'
import { NotFound } from '~/components/Graph/widget/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import ThemeRoot from '~/components/Graph/ThemeRoot';
import ThemeToggle from '~/components/Graph/widget/ThemeToggle';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRoot>
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          <nav className="bg-gradient-to-r from-purple-900 via-indigo-800 to-violet-800 shadow-lg w-full rounded-lg">
            <div className="w-full px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link
                    to="/"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                    activeOptions={{ exact: true }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/posts"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    Posts
                  </Link>
                  <Link
                    to="/users"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    Users
                  </Link>
                  <Link
                    to="/route-a"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    Pathless Layout
                  </Link>
                  <Link
                    to="/deferred"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    Deferred
                  </Link>
                  <Link
                    // @ts-expect-error
                    to="/this-route-does-not-exist"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    This Route Does Not Exist
                  </Link>
                  <Link
                    to="/graphs"
                    className="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 hover:bg-opacity-30 transition-all duration-200"
                    activeProps={{
                      className: 'bg-purple-500 bg-opacity-40 text-white px-3 py-2 rounded-md text-base font-bold border-b-2 border-pink-400',
                    }}
                  >
                    Graph
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <hr className="mb-4" />
          {children}
          <TanStackRouterDevtools position="bottom-right" />
          <Scripts />
        </body>
      </html>
    </ThemeRoot>
  )
}
