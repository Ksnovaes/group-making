import { Box } from "@ignite-ui/react";
import { styled } from "../stitches.config";

export const Container = styled('main', {
    maxWidth: 572,
    margin: '5rem auto 1rem',
    padding: '0 1rem'
})

export const Form = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    }
})

