module.exports = {
  response: (res, result, status, err) => {
    const output = {}
    output.status = 'success',
    output.statusCode = status,
    output.result = result,
    output.err = err || null
    return res.status(output.statusCode).json(output)
  }
}
