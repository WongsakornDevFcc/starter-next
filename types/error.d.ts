export type ResErrorProps = {
    data: {
        message: string
    }
}

export type ServerResErrorProps = {
    response: {
        data: {
            error: boolean
            message: string
        }
    }
}

