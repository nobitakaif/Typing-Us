import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/typing')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Outlet />
    </div>
  )
}
