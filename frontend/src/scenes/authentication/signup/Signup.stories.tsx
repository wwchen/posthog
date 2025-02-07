// Signup.stories.tsx
import { Meta } from '@storybook/react'
import { useEffect } from 'react'
import { mswDecorator, useStorybookMocks } from '~/mocks/browser'
import { userLogic } from 'scenes/userLogic'
import preflightJson from '~/mocks/fixtures/_preflight.json'
import { SignupContainer } from './SignupContainer'

export default {
    title: 'Scenes-Other/Signup',
    parameters: {
        layout: 'fullscreen',
        options: { showPanel: false },
        testOptions: {
            waitForLoadersToDisappear: true,
        },
        viewMode: 'story',
    },
    decorators: [
        mswDecorator({
            get: { '/api/users/@me': () => [500, null] },
            post: { '/api/signup': (_, __, ctx) => [ctx.delay(1000), ctx.status(200), ctx.json({ success: true })] },
        }),
    ],
} as Meta

export const SelfHosted = (): JSX.Element => {
    useStorybookMocks({
        get: {
            '/_preflight': {
                ...preflightJson,
                cloud: false,
                realm: 'hosted-clickhouse',
                available_social_auth_providers: { github: false, gitlab: false, 'google-oauth2': false, saml: false },
            },
        },
    })
    useEffect(() => {
        userLogic.actions.loadUserSuccess(null)
    }, [])
    return <SignupContainer />
}

export const SelfHostedSSO = (): JSX.Element => {
    useStorybookMocks({
        get: {
            '/_preflight': {
                ...preflightJson,
                cloud: false,
                realm: 'hosted-clickhouse',
                available_social_auth_providers: { github: true, gitlab: true, 'google-oauth2': true, saml: true },
            },
        },
    })
    useEffect(() => {
        userLogic.actions.loadUserSuccess(null)
    }, [])
    return <SignupContainer />
}

export const Cloud = (): JSX.Element => {
    useStorybookMocks({
        get: {
            '/_preflight': {
                ...preflightJson,
                cloud: true,
                realm: 'cloud',
                available_social_auth_providers: { github: false, gitlab: false, 'google-oauth2': false, saml: false },
            },
        },
    })
    useEffect(() => {
        userLogic.actions.loadUserSuccess(null)
    }, [])
    return <SignupContainer />
}
