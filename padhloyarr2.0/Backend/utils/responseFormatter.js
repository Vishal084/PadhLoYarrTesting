const success = (res, status, message, data = null) => {
    const response = {
      success: true,
      message
    };
    
    if (data) {
      response.data = data;
    }
    
    return res.status(status).json(response);
  };
  
  const error = (res, status, message, error = null) => {
    const response = {
      success: false,
      message
    };
    
    if (error && process.env.NODE_ENV === 'development') {
      response.error = error;
    }
    
    return res.status(status).json(response);
  };
  
  module.exports = {
    success,
    error
  };