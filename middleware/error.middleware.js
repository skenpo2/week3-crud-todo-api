const errorMiddleWare = (err, req, res, next) => {
  res.status(500).json({ error: "Server error!" });
};

export default errorMiddleWare;
