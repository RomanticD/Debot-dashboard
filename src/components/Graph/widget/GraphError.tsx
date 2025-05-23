import { ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'

export function GraphErrorComponent({ error }: ErrorComponentProps) {
    return <ErrorComponent error={error} />
}
