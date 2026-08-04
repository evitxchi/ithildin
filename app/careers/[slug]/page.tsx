import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OPEN_ROLES, getRole } from '../roles'
import RoleView from './RoleView'

export function generateStaticParams() {
  return OPEN_ROLES.map(r => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const role = getRole(params.slug)
  if (!role) return { title: 'Careers | Ithildin' }
  return { title: `${role.title} | Ithildin`, description: role.summary }
}

export default function RolePage({ params }: { params: { slug: string } }) {
  const role = getRole(params.slug)
  if (!role) notFound()
  return <RoleView role={role} />
}
