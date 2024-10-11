const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border loading" role="status" style={{width: "6rem", height:"6rem"}}>
        <span className="visually-hidden">Loading...</span>
      </div>  
    </div>
  )
}


export default Loading;