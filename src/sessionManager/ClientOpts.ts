export interface ClientOpts {
  /**
   * IP address of the Redis server.
   * @default 127.0.0.1
   */
  host?: string | undefined;
  /**
   * Port of the Redis server.
   * @default 6379
   */
  port?: number | undefined;
  /**
   * The UNIX socket string of the Redis server.
   * @default null
   */
  path?: string | undefined;
  /**
   * The URL of the Redis server.\
   * Format:
   * [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]\
   * More info avaliable at [IANA](http://www.iana.org/assignments/uri-schemes/prov/redis).
   * @default null
   */
  url?: string | undefined;
  parser?: string | undefined;
  /**
   * Set to `true`, Node Redis will return Redis number values as Strings instead of javascript Numbers.
   * Useful if you need to handle big numbers (above `Number.MAX_SAFE_INTEGER` === 2^53).
   * Hiredis is incapable of this behavior, so setting this option to `true`
   * will result in the built-in javascript parser being used no matter
   * the value of the `parser` option.
   * @default null
   */
  string_numbers?: boolean | undefined;
  /**
   * If set to `true`, then all replies will be sent to callbacks as Buffers instead of Strings.
   * @default false
   */
  return_buffers?: boolean | undefined;
  /**
   * If set to `true`, then replies will be sent to callbacks as Buffers.
   * This option lets you switch between Buffers and Strings on a per-command basis,
   * whereas `return_buffers` applies to every command on a client.\
   * **Note**: This doesn't work properly with the pubsub mode.
   * A subscriber has to either always return Strings or Buffers.
   * @default false
   */
  detect_buffers?: boolean | undefined;
  /**
   * If set to `true`, the keep-alive functionality is enabled on the underlying socket.
   * @default true
   */
  socket_keepalive?: boolean | undefined;
  /**
   * Initial Delay in milliseconds.
   * This will also set the initial delay for keep-alive packets being sent to Redis.
   * @default 0
   */
  socket_initial_delay?: number | undefined;
  /**
   * When a connection is established to the Redis server,
   * the server might still be loading the database from disk.
   * While loading, the server will not respond to any commands.
   * To work around this, Node Redis has a "ready check" which sends the **INFO** command to the server.
   * The response from the **INFO** command indicates whether the server is ready for more commands.
   * When ready, **node_redis** emits a **ready** event.
   * Setting `no_ready_check` to `true` will inhibit this check.
   * @default false
   */
  no_ready_check?: boolean | undefined;
  /**
   * By default, if there is no active connection to the Redis server,
   * commands are added to a queue and are executed once the connection has been established.
   * Setting `enable_offline_queue` to `false` will disable this feature
   * and the callback will be executed immediately with an error,
   * or an error will be emitted if no callback is specified.
   * @default true
   */
  enable_offline_queue?: boolean | undefined;
  retry_max_delay?: number | undefined;
  connect_timeout?: number | undefined;
  max_attempts?: number | undefined;
  /**
   * If set to `true`, all commands that were unfulfilled while the connection is lost
   * will be retried after the connection has been reestablished.
   * Use this with caution if you use state altering commands (e.g. incr).
   * This is especially useful if you use blocking commands.
   * @default false
   */
  retry_unfulfilled_commands?: boolean | undefined;
  auth_pass?: string | undefined;
  /**
   * If set, client will run Redis auth command on connect.
   * Alias `auth_pass`.\
   * **Note**: Node Redis < 2.5 must use `auth_pass`.
   * @default null
   */
  password?: string | undefined;
  /**
   * If set, client will run Redis **select** command on connect.
   * @default null
   */
  db?: string | number | undefined;
  /**
   * You can force using IPv6 if you set the family to **IPv6**.
   * @see Node.js [net](https://nodejs.org/api/net.html)
   * or [dns](https://nodejs.org/api/dns.html)
   * modules on how to use the family type.
   * @default IPv4
   */
  family?: string | undefined;
  /**
   * If set to `true`, a client won't resubscribe after disconnecting.
   * @default false
   */
  disable_resubscribing?: boolean | undefined;
  /**
   * Passing an object with renamed commands to use instead of the original functions.
   * For example, if you renamed the command **KEYS** to "DO-NOT-USE"
   * then the `rename_commands` object would be: { KEYS : "DO-NOT-USE" }.
   * @see the [Redis security topics](http://redis.io/topics/security) for more info.
   * @default null
   */
  rename_commands?: { [command: string]: string } | null | undefined;
  /**
   * An object containing options to pass to
   * [tls.connect](https://nodejs.org/api/tls.html#tls_tls_connect_port_host_options_callback)
   * to set up a TLS connection to Redis
   * (if, for example, it is set up to be accessible via a tunnel).
   * @default null
   */
  tls?: any;
  /**
   * A string used to prefix all used keys (e.g. namespace:test).
   * Please be aware that the **keys** command will not be prefixed.
   * The **keys** command has a "pattern" as argument and no key
   * and it would be impossible to determine the existing keys in Redis if this would be prefixed.
   * @default null
   */
  prefix?: string | undefined;
}
