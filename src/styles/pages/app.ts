import { styled } from "../stitches.config";

export const Header = styled('header', {
    backgroundColor: '$gray800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem 0',

    div: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
    }
})

export const LoginButton = styled('a', {
    display: 'flex',
    color: '#fff',
    marginRight: '1.25rem',
    textDecoration: 'none',
    border: '1px solid $orange700', 
    borderRadius: '4px',
    padding: '0.5rem 20px',
    transition: 'all 0.3s ease',

    '&:hover': {
        backgroundColor: '$orange700'
    }
})
