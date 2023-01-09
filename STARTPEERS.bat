@REM 多次试验，下面第一种方法可行，其余两种不行
start cmd /k "set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && npm run dev"
start cmd /k "set HTTP_PORT=3003 && set P2P_PORT=5003 && set PEERS=ws://localhost:5001,ws://localhost:5002 && npm run dev"


@REM 下面的方法不行
@REM start set HTTP_PORT=3002 set P2P_PORT=5002 set PEERS=ws://localhost:5001 npm run dev
@REM start set HTTP_PORT=3003 set P2P_PORT=5003 set PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

@REM start
@REM set HTTP_PORT=3002
@REM set P2P_PORT=5002
@REM set PEERS=ws://localhost:5001
@REM npm run dev
@REM start
@REM set HTTP_PORT=3003
@REM set P2P_PORT=5003
@REM set PEERS=ws://localhost:5001,ws://localhost:5002
@REM npm run dev