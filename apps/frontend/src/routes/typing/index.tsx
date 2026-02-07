
import { createFileRoute } from '@tanstack/react-router'
import { Skiper26} from "../../components/theme"

export const Route = createFileRoute('/typing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Skiper26/>
  </div>
}
