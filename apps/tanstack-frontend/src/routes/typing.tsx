import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/typing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/typing"!22222</div>
}
