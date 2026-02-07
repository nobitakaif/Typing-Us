import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/typing/body')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/typing/body"!</div>
}
