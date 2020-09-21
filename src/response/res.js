module.exports = {
  response: (res, result, status, message, err, pagination) => {
    const output = {}
    if (pagination) {
      output.pagination = pagination
    }
    if (message) {
      output.message = message
    }
    if (err) {
      output.err = err || null
    }
    output.statusCode = status,
    output.result = result
    return res.status(status).json(output)
  },
  status: {
    found: 'Data found',
    insert: 'Data successfully added',
    update: 'Data successfully updated',
    delete: 'Data successfully deleted'
  }
}
