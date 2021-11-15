export const handlePipelineError = (args: Array<[Error | null, unknown]>) => {
    const errors = [];
    const { length } = args;
    const response = new Array(length);

    for (let i = 0; i < length; i += 1) {
        const [err, res] = args[i];

        if (err) errors.push(err);

        response[i] = res;
    }

    if (errors.length > 0) {
        const message = errors.map((err) => err.message).join('; ');
        throw new Error(message);
    }

    return response;
};
