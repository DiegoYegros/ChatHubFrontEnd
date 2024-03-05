interface ConnectionStatusBoxProps {
    isConnected: boolean;
    onErrorClick: () => false | (() => Promise<void>);
    connectionError: boolean;
  }

  const handleConnectionError = (isConnected: boolean, connectionError: boolean): string =>{
      if (isConnected){
        return "bg-success"
      }
      if (connectionError){
        return "bg-danger card-hoverable-error"
      }
        return "bg-secondary"

  }
  const ConnectionStatusBox: React.FC<ConnectionStatusBoxProps> = ({ isConnected, onErrorClick , connectionError}) => {
    return (
      <div
      aria-hidden="true"
        className={`card position-fixed top-0 end-0 mt-3 me-3 p-3 connection-status rounded ${handleConnectionError(isConnected, connectionError)}`}
        style={{
          width: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: connectionError ? "pointer" : "default",
        }}
        onClick={onErrorClick}
        title={connectionError ? "Retry connection" : "Connected"}
      >
        {isConnected ? (
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm-1 17.414l-4.293-4.293-1.414 1.414 5.707 5.707 9.293-9.293-1.414-1.414-7.879 7.879z" />
          </svg>
        ) : connectionError ? (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/50/error--v1.png"
            alt="error--v1"
          />
        ) : (
          <div style={{ display: "flex", gap: "4px" }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
    );
  };
  export default ConnectionStatusBox;