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

export const GroupList = styled('ul', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    li: {
        listStyle: 'none',
        border: '3px solid $gray700',
        borderRadius: '5px',
        backgroundColor: '$gray900',
        padding: '1rem'
    }
})

