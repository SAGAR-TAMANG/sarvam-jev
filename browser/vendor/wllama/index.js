var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __asyncGenerator = (__this, __arguments, generator) => {
  var resume = (k, v, yes, no) => {
    try {
      var x = generator[k](v), isAwait = (v = x.value) instanceof __await, done = x.done;
      Promise.resolve(isAwait ? v[0] : v).then((y) => isAwait ? resume(k === "return" ? k : "next", v[1] ? { done: y.done, value: y.value } : y, yes, no) : yes({ value: y, done })).catch((e) => resume("throw", e, yes, no));
    } catch (e) {
      no(e);
    }
  }, method = (k) => it[k] = (x) => new Promise((yes, no) => resume(k, x, yes, no)), it = {};
  return generator = generator.apply(__this, __arguments), it[__knownSymbol("asyncIterator")] = () => it, method("next"), method("throw"), method("return"), it;
};
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({ value, done }), no)))), method("next"), method("return"), it);

// src/glue/messages.ts
var GLUE_VERSION = 1;
var GLUE_MESSAGE_PROTOTYPES = {
  "erro_evt": {
    "name": "erro_evt",
    "structName": "glue_msg_error",
    "className": "GlueMsgError",
    "fields": [
      {
        "type": "str",
        "name": "message",
        "isNullable": false
      }
    ]
  },
  "load_req": {
    "name": "load_req",
    "structName": "glue_msg_load_req",
    "className": "GlueMsgLoadReq",
    "fields": [
      {
        "type": "arr_str",
        "name": "model_paths",
        "isNullable": false
      },
      {
        "type": "str",
        "name": "mmproj_path",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "n_ctx_auto",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "use_mmap",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "use_mlock",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_gpu_layers",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_ctx",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_threads",
        "isNullable": false
      },
      {
        "type": "str",
        "name": "model_alias",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "log_level",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "embeddings",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "offload_kqv",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_batch",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_ubatch",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_parallel",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "pooling_type",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "rope_scaling_type",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "rope_freq_base",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "rope_freq_scale",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "yarn_ext_factor",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "yarn_attn_factor",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "yarn_beta_fast",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "yarn_beta_slow",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "yarn_orig_ctx",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "cache_type_k",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "cache_type_v",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "kv_unified",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "flash_attn",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "swa_full",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_ctx_checkpoints",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "checkpoint_min_step",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "chat_template",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "jinja",
        "isNullable": true
      },
      {
        "type": "arr_str",
        "name": "default_template_kwargs_keys",
        "isNullable": true
      },
      {
        "type": "arr_str",
        "name": "default_template_kwargs_vals",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "reasoning",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "image_min_tokens",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "image_max_tokens",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "warmup",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "no_kv_offload",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "mmproj_offload",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "cont_batching",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_keep",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "ctx_shift",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "cache_idle_slots",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "n_cache_reuse",
        "isNullable": true
      },
      {
        "type": "arr_str",
        "name": "lora_paths",
        "isNullable": true
      },
      {
        "type": "arr_float",
        "name": "lora_scales",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "lora_init_without_apply",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "spec_draft_model",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "spec_draft_ngl",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "spec_draft_n_max",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "spec_draft_n_min",
        "isNullable": true
      },
      {
        "type": "float",
        "name": "spec_draft_p_min",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "spec_draft_threads",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "spec_draft_threads_batch",
        "isNullable": true
      },
      {
        "type": "arr_str",
        "name": "kv_overrides_keys",
        "isNullable": true
      },
      {
        "type": "arr_str",
        "name": "kv_overrides_vals",
        "isNullable": true
      },
      {
        "type": "int",
        "name": "reasoning_budget_tokens",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "reasoning_budget_message",
        "isNullable": true
      },
      {
        "type": "str",
        "name": "reasoning_format",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "skip_chat_parsing",
        "isNullable": true
      },
      {
        "type": "bool",
        "name": "prefill_assistant",
        "isNullable": true
      }
    ]
  },
  "load_res": {
    "name": "load_res",
    "structName": "glue_msg_load_res",
    "className": "GlueMsgLoadRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_ctx",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_batch",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_ubatch",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_vocab",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_ctx_train",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_embd",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "n_layer",
        "isNullable": false
      },
      {
        "type": "arr_str",
        "name": "metadata_key",
        "isNullable": false
      },
      {
        "type": "arr_str",
        "name": "metadata_val",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "token_bos",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "token_eos",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "token_eot",
        "isNullable": false
      },
      {
        "type": "arr_int",
        "name": "list_tokens_eog",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "add_bos_token",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "add_eos_token",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "has_encoder",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "token_decoder_start",
        "isNullable": false
      },
      {
        "type": "str",
        "name": "media_marker",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "has_image_input",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "has_audio_input",
        "isNullable": false
      }
    ]
  },
  "cmpl_req": {
    "name": "cmpl_req",
    "structName": "glue_msg_completion_req",
    "className": "GlueMsgCompletionReq",
    "fields": [
      {
        "type": "bool",
        "name": "is_chat",
        "isNullable": false
      },
      {
        "type": "str",
        "name": "data_json",
        "isNullable": false
      },
      {
        "type": "arr_raw",
        "name": "files",
        "isNullable": false
      }
    ]
  },
  "cmpl_res": {
    "name": "cmpl_res",
    "structName": "glue_msg_completion_res",
    "className": "GlueMsgCompletionRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "req_id",
        "isNullable": false
      }
    ]
  },
  "embd_req": {
    "name": "embd_req",
    "structName": "glue_msg_embedding_req",
    "className": "GlueMsgEmbeddingReq",
    "fields": [
      {
        "type": "str",
        "name": "data_json",
        "isNullable": false
      },
      {
        "type": "arr_raw",
        "name": "files",
        "isNullable": false
      }
    ]
  },
  "embd_res": {
    "name": "embd_res",
    "structName": "glue_msg_embedding_res",
    "className": "GlueMsgEmbeddingRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "req_id",
        "isNullable": false
      }
    ]
  },
  "rrnk_req": {
    "name": "rrnk_req",
    "structName": "glue_msg_rerank_req",
    "className": "GlueMsgRerankReq",
    "fields": [
      {
        "type": "str",
        "name": "data_json",
        "isNullable": false
      }
    ]
  },
  "rrnk_res": {
    "name": "rrnk_res",
    "structName": "glue_msg_rerank_res",
    "className": "GlueMsgRerankRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      },
      {
        "type": "int",
        "name": "req_id",
        "isNullable": false
      }
    ]
  },
  "gres_req": {
    "name": "gres_req",
    "structName": "glue_msg_get_result_req",
    "className": "GlueMsgGetResultReq",
    "fields": [
      {
        "type": "int",
        "name": "req_id",
        "isNullable": false
      }
    ]
  },
  "gres_res": {
    "name": "gres_res",
    "structName": "glue_msg_get_result_res",
    "className": "GlueMsgGetResultRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "has_more",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "is_error",
        "isNullable": false
      },
      {
        "type": "str",
        "name": "data_json",
        "isNullable": false
      }
    ]
  },
  "cncl_req": {
    "name": "cncl_req",
    "structName": "glue_msg_cancel_req",
    "className": "GlueMsgCancelReq",
    "fields": [
      {
        "type": "int",
        "name": "req_id",
        "isNullable": false
      }
    ]
  },
  "cncl_res": {
    "name": "cncl_res",
    "structName": "glue_msg_cancel_res",
    "className": "GlueMsgCancelRes",
    "fields": [
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      }
    ]
  },
  "tbop_req": {
    "name": "tbop_req",
    "structName": "glue_msg_test_backend_ops_req",
    "className": "GlueMsgTestBackendOpsReq",
    "fields": [
      {
        "type": "arr_str",
        "name": "args",
        "isNullable": false
      }
    ]
  },
  "tbop_res": {
    "name": "tbop_res",
    "structName": "glue_msg_test_backend_ops_res",
    "className": "GlueMsgTestBackendOpsRes",
    "fields": [
      {
        "type": "int",
        "name": "retcode",
        "isNullable": false
      },
      {
        "type": "bool",
        "name": "success",
        "isNullable": false
      }
    ]
  }
};

// src/glue/glue.ts
var GLUE_MAGIC = new Uint8Array([71, 76, 85, 69]);
var GLUE_DTYPE_NULL = 0;
var GLUE_DTYPE_BOOL = 1;
var GLUE_DTYPE_INT = 2;
var GLUE_DTYPE_FLOAT = 3;
var GLUE_DTYPE_STRING = 4;
var GLUE_DTYPE_RAW = 5;
var GLUE_DTYPE_ARRAY_BOOL = 6;
var GLUE_DTYPE_ARRAY_INT = 7;
var GLUE_DTYPE_ARRAY_FLOAT = 8;
var GLUE_DTYPE_ARRAY_STRING = 9;
var GLUE_DTYPE_ARRAY_RAW = 10;
var TYPE_MAP = {
  str: GLUE_DTYPE_STRING,
  int: GLUE_DTYPE_INT,
  float: GLUE_DTYPE_FLOAT,
  bool: GLUE_DTYPE_BOOL,
  raw: GLUE_DTYPE_RAW,
  arr_str: GLUE_DTYPE_ARRAY_STRING,
  arr_int: GLUE_DTYPE_ARRAY_INT,
  arr_float: GLUE_DTYPE_ARRAY_FLOAT,
  arr_bool: GLUE_DTYPE_ARRAY_BOOL,
  arr_raw: GLUE_DTYPE_ARRAY_RAW,
  null: GLUE_DTYPE_NULL
};
function glueDeserialize(buf) {
  let offset = 0;
  const view = new DataView(buf.buffer);
  const readUint32 = () => {
    const value = view.getUint32(offset, true);
    offset += 4;
    return value;
  };
  const readInt32 = () => {
    const value = view.getInt32(offset, true);
    offset += 4;
    return value;
  };
  const readFloat = () => {
    const value = view.getFloat32(offset, true);
    offset += 4;
    return value;
  };
  const readBool = () => {
    return readUint32() !== 0;
  };
  const readString = (customLen) => {
    const length = customLen != null ? customLen : readUint32();
    const value = new TextDecoder().decode(buf.slice(offset, offset + length));
    offset += length;
    return value;
  };
  const readRaw = () => {
    const length = readUint32();
    const value = buf.slice(offset, offset + length);
    offset += length;
    return value;
  };
  const readArray = (readItem) => {
    const length = readUint32();
    const value = new Array(length);
    for (let i = 0; i < length; i++) {
      value[i] = readItem();
    }
    return value;
  };
  const readNull = () => null;
  const readField = (field) => {
    switch (field.type) {
      case "str":
        return readString();
      case "int":
        return readInt32();
      case "float":
        return readFloat();
      case "bool":
        return readBool();
      case "raw":
        return readRaw();
      case "arr_str":
        return readArray(readString);
      case "arr_int":
        return readArray(readInt32);
      case "arr_float":
        return readArray(readFloat);
      case "arr_bool":
        return readArray(readBool);
      case "arr_raw":
        return readArray(readRaw);
      case "null":
        return readNull();
    }
  };
  const magicValid = buf[0] === GLUE_MAGIC[0] && buf[1] === GLUE_MAGIC[1] && buf[2] === GLUE_MAGIC[2] && buf[3] === GLUE_MAGIC[3];
  offset += 4;
  if (!magicValid) {
    throw new Error("Invalid magic number");
  }
  const version = readUint32();
  if (version !== GLUE_VERSION) {
    throw new Error("Invalid version number");
  }
  const name = readString(8);
  const msgProto = GLUE_MESSAGE_PROTOTYPES[name];
  if (!msgProto) {
    throw new Error(`Unknown message name: ${name}`);
  }
  const output = { _name: name };
  for (const field of msgProto.fields) {
    const readType = readUint32();
    if (readType === GLUE_DTYPE_NULL) {
      if (!field.isNullable) {
        throw new Error(
          `${name}: Expect field ${field.name} to be non-nullable`
        );
      }
      output[field.name] = null;
      continue;
    }
    if (readType !== TYPE_MAP[field.type]) {
      throw new Error(
        `${name}: Expect field ${field.name} to have type ${field.type}`
      );
    }
    output[field.name] = readField(field);
  }
  return output;
}
function glueSerialize(msg) {
  const msgProto = GLUE_MESSAGE_PROTOTYPES[msg._name];
  if (!msgProto) {
    throw new Error(`Unknown message name: ${msg._name}`);
  }
  const bufs = [];
  const writeUint32 = (value) => {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setUint32(0, value, true);
    bufs.push(new Uint8Array(buf));
  };
  const writeInt32 = (value) => {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setInt32(0, value, true);
    bufs.push(new Uint8Array(buf));
  };
  const writeFloat = (value) => {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setFloat32(0, value, true);
    bufs.push(new Uint8Array(buf));
  };
  const writeBool = (value) => {
    writeUint32(value ? 1 : 0);
  };
  const writeString = (value) => {
    const utf8 = new TextEncoder().encode(value);
    writeUint32(utf8.byteLength);
    bufs.push(utf8);
  };
  const writeRaw = (value) => {
    writeUint32(value.byteLength);
    bufs.push(value);
  };
  const writeArray = (value, writeItem) => {
    writeUint32(value.length);
    for (const item of value) {
      writeItem(item);
    }
  };
  const writeNull = () => {
  };
  bufs.push(GLUE_MAGIC);
  writeUint32(GLUE_VERSION);
  {
    const utf8 = new TextEncoder().encode(msg._name);
    bufs.push(utf8);
  }
  for (const field of msgProto.fields) {
    const val = msg[field.name];
    if (!field.isNullable && (val === null || val === void 0)) {
      throw new Error(
        `${msg._name}: Expect field ${field.name} to be non-nullable`
      );
    }
    if (val === null || val === void 0) {
      writeUint32(GLUE_DTYPE_NULL);
      continue;
    }
    writeUint32(TYPE_MAP[field.type]);
    switch (field.type) {
      case "str":
        writeString(val);
        break;
      case "int":
        writeInt32(val);
        break;
      case "float":
        writeFloat(val);
        break;
      case "bool":
        writeBool(val);
        break;
      case "raw":
        writeRaw(val);
        break;
      case "arr_str":
        writeArray(val, writeString);
        break;
      case "arr_int":
        writeArray(val, writeInt32);
        break;
      case "arr_float":
        writeArray(val, writeFloat);
        break;
      case "arr_bool":
        writeArray(val, writeBool);
        break;
      case "arr_raw":
        writeArray(val, writeRaw);
        break;
      case "null":
        writeNull();
        break;
    }
  }
  const totalLength = bufs.reduce((acc, buf) => acc + buf.byteLength, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const buf of bufs) {
    output.set(buf, offset);
    offset += buf.byteLength;
  }
  return output;
}

// src/wasm/source-map.ts
var WASM_SOURCE_MAP = {
  "default": "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",
  "compat": "H4sIAAAAAAAAA+S9+Y4cR5I32EDrIFsSKZ5VrOJRF8kIXmJlFdnqaoo9akmt0ag1rVEfg5n5BgHPCM/MUMXFOLKqhAWxC+wTLBZYYF/k+38fYR9osTBzjwg/zCOSHH1AA98/ZKXZzz08PPwwN7fj//nFL37x33d+8Yv/9/IvfrHG0yos46LmWTBt4qSOs2BWcv6r+TxNAjbNy/pOkrCUBWke8SSYsoofHYUlZzUPap5VeflhXvCS1Xm5lfGTzTBP0zwLfqzy7OjotfLL8+8qv4K45qkOQJLnrwdBeMoCliR5CA/hpyEv6jjPzlV1dHT05MmTqwIBzey514MgTFg2D0KWJEHNyzTOWM3fS3kapsVH4nWiKIjTIrmWJGkwL1mxCMI8q/lpfXQUTj+Z5nmypb5skrOIl0dHc14Hx/zsRZNV8Tzj0Vb85MmTl+/w02L2XlWXCc+uiCbNG1ZGQckTziqu0Vj4qolLvobtiCt8bjxv8qYKyvyk2sVn4wu2vfnZZy/CBSsfIRWed3+0fbMkZ/XL+2qfLlnScKOfkeb557Et0BDROxWvg4yl/CL+Knm1YAUPDqILYRIXorugmy4EQXSWsTQOg5BVsmzaJNizetnD6LJobpLPgzireZmx5EA2peDzoMnqOAkKVlbwGq8dHM+/po0qaDKLs+qCpELtLIr0Z0+iD/F3wcu0qfmHXTNTVt9UHtQ+vO32h1fEUCl5ULGUB1jb/ZN50Rwd/T7Ooq/LvCm+yury7OjotU7w/A+wbDY9q3l1nxhkry2a56+LLloUrGRpdXSUBQvOouB4eY1k3LSoPJ1GsswVizmbvRPm1WxdGTZHR8qPx+p4enXCs4O6rrChNtnzcTYtyj3i1SzSJW34w0KySTd9GcxfsaHXWl7XPn83QQ6XeRyJSRMENawGU5awLOQBm9W8DOKs4mX9ogfALLpqPajMXS07hpa9U8XZ7AZ+WFggo2CWlyfwTvy0YFn0eZbki5Rl2dERTi42jYPlQbA/CZ4eHU1ZFYfY7Bc9DFqhsj7Gumd5mTIxAd8r8yaLZu/HRRln9eyqGFT8RK63ONEu2wuJGOLLmJ8Ek+gGsa6nuKZuER9PvFiSlyxI03eSfD5bT1kQlcEsYWEAC1rOoiBk4YJ/0K4aIaufiGnxp+mPPKx/zyr+QhC+yNNCvOXrnuf5SgMPots/xtmP7Oho1mRhwMp5dXTEs6opeRDmTVbvjmw6wavj5Q27ClgJi7wSixL8gMX1urqAiVfN8jLdPeHTedEERVzwJM5glTQoWpMPo0v4Q13L3pvzmmfLC7BQv3y5FeZZVd/zz83klxObaBWyhF/WhjDPIs+/gNy6ZFlV5BX/qKqncQCN3n+e8HdYnceXzS+/H32qjvkFqxZBzaYJf9FTRMcHQZQHJQfEi7ps+Mtd2YBwweogreb9cttS+g0a1kVW8ozpazKSPN/11X/fzGbEVxevWeYFx4H7/ykV8qKKE/gb1+BHWwqrqllZUwyeRRQ5iWtesoSsir9qOKwKBC9c5DHNKXnB6xgkC4rL6FZkOdlmlp215PcTMbk3YRbW+THP4p94GRQJS/OJHJ1i0E1ZWca8VIfFlIuBXaYVjuAPux08mEQbcjbg7h7AZiP/gu3TmgCzWbbXyxwln/NT2BnDhRhJMKAD+Jgg34Rpca7KxJD+aD5vZsEsziKQOJTpsR/d758ShPl8maB8Z9I8/x/ecsXs1v1bzhUMOuUqIWLtX9U6J8zTgpVSJqjieZrH0bYlE4jlHmQDGAus3hlAyOH3a2NKBRFP4hR49nTreZ5/LgiqxZzX4bs1yxYzKZmxqvbVQu3u9Nomev4N8/PHMEb6NSzMs2Uwia4HQVEvSthWQSw6DZosycPj3/XLypKHdV6+iLNaiJ5H7YLCKpB+g5O4XgRV/BMHyINHW/DvS7E0zoqDSVDnwazYf35vVFoFwMurZnuwNUMjJOI1i0GI4ae8tAbJnNeef0uTdsQ2UPBgxuDNqvPysyfNJRyd6oJ+LgAZsZ4dyFULPzzIseZK3IqXdZzyoJEbTtVMxflCFTZRrl7EWX1RftUsGB9PVcFC7vmP5YYUxVUBkzOIeBX2+5RG9vzzy3aWbvYzpORVk9RHR3j2yYqmvoAzuD4rOAobH+NP/CZLpG4WJQ9O5lVydPTVaVH+Ebr56ChDWfWdIj+Z6XL2fiT6E9ejE9HxEZ82882Kl0teBjWrjo+OXiu/PP++Ll2wKID6xe9ZCWI3CH68PBT1HS+F7BFE1fJQObLlaQErpzxoir89/zYxE+I0bXCj9Pw1ubqGx7CVyM9Z8Xpr4HPwovL8Pa1eVpbsDGqHrpMSVuX5F/stP5jGrDonDiEsumGvwXFWBCU7eYpzzykOLVki1uRqwYQIK2Xlrh+qsyxclDnsJJ6/O/AaKSuPYbm5/Mc/fhd8+7d+SfX8e5YsXfI0X3JDer5BC8qV529q3TptZjOQwKtgkVf1w5rN51zumN2IfE1QPX9d7ndlftLW0mQVm3ExBat8VgcpO1VOmzC/8qYumloev4IoTitKAA5RAN7RRDFcuOtcOQE+8PwbYnyesKUYnUWYinFZ3VJHbsTDPOLKsN2Dz7JgWcZh6hdBnMU1iDJZBAcGyblt9CG0vzphQcFqWITOxVXAXzUsWZebaxXjKs+zuhLjR4iVYcLS4ibV6zAiYYFuN48qXPCUBXE2y/vNQyF6/uDYB1l1W4zYZVwHeYEHRJ3g+b2ccjBJuFyBmyksT91xUvz0/G1qW9DE+4vaChpHYhqFxdm29sIpr5l43SIRPV3zLbNLakTgp8duuaJ9/wpnzYQ1dd6qAtS/wzxJeFgHRclxBYuE0AYD/vdiVP3QJHB0UH55/pfqbBJtE9+mnU5VzcR+xdMiYSHH9hrM68Y4iaug5GEpzzZJg1NAEQEPonVqNICa7JoyGWa4zZ6wYz60VAjB2PP3Www2AlQiRRJnyunBYHj+h4GUKWZxwn8VBO2fv8ybVtHUpHguOy83kqQRu+0sToQWiTiwsbrO5OYcH8AfPA2Ls6/euJ9nZZ7VBveXBYtuuySVEx7PF/XOgCAT5CXsBle7MyfuZVI32n+ew+hAyp3BkpUxg+ncLYUOTn8kQzkj5UwR/zqS558H6WwBXYNL+1/+Ofjmu+//eHRU1aXn78utt+RVkWe41Ir2v6YZnm9qnuIKFqhr3QvO4rJq3/AGNeZgstTvzirOj6/xFI6HX+Ds7vRlz8ekQ9mp4kvhXgtfarfG71jzXhY2KJ7/XlWFLJv1Ok0YarLtKBHBE0Tb35udlHHNN4itouS4YFzV1gpsh+dv9QenIKjysj6QA+qLRBy/PwqCk5IVwSxM8or/3pKt8W886Thlax1yH8QmOSbEKofbp0Hz/Ge6vIQDgLM0CPPirF3/TVKrCIaTh+y0KsXjwgeKDPxhK8cE/LRu1StJE/BytiF+YX+Vvd4+yyN+XRscqESa8qq+Y+sZxCyflyxNWblGykq4tEDryzIvAxDVWRTVswPPEBJ7uYjXQuQNjoM4Oq12sDVSdpaC3zTOojibB/mSlwkrdrUGwx7ZjemqKYq8rHl03d5gQJD+EM8ZGegbePRBEKAyvorr2VUY/93I/0FcDvzDCoMCpQfXkLjTCtS4HSkCttye9tM6hdsONueweRVlHoKUdHT0mmZ4/i+TfC4VyMs8ZFOc9zyf+yv076sgZdWx3NdxlxcDAY8ysCzjiuD5W6ZsXi9A0MPTCH7Xa3NgVDUsT+2f7QiFAXdFPcwGUVzysH6Pnxbp/uxdflpMZkOiDF4qDB30Mz5nNR9CiH3xC2PzK3jYJKyOlzyISjar7e3RRHj+GqnU/o//fKJJ4tg9Qj2D/fPC6xQ2MAo8/2JdxmlwsohrjofGj6q6hAEt9MkPxRfBQRFErGby3FKwso5ZgqsXfEPYGx2yfdmfqJTDyevub9TwySMkK8tA6rOXPAyivA5mBxOxdiQTPCOKRSVOJ2GeiHUkipe469+zRbt26gG7FQ3pq7IT1FiBygK65cN2AYYd7f0TcWvxYVWXdX4a7E+ePTt8D38k78NJbZrNbguxPi0OWqFeHEjxLMpPbzo1TrNZtu1kgtASpAvmVlgB4olrftH0O8bpTxx9gpLnJW7el7SvATNLKjxqXggxunolhRXUiuDxaTareG0pOQ7l2T7lLBNF+Wnx3myWNNXiVsR5ARt8sDwUw6jO80TuR5WqC5yXLItrfohHGRjr4tWnIBgqG2cVh58n8+/zJA7PHm2tctY+10qa7wdBFcONCajRkjh9PwjCvIpme19//dc/fMdrdnT09bd/e9H/6nRFwfHyV93B5dM1Y00t8grHwbqmylB+XNcY3XBsyVWS1zBXccX3/Gvq2RG7bhrXcE84vn2VeX3f2tuTvO429fbvXhGIIkHKs/roiJ/ysKn5ozir24UF3r0pQFkHx+V5XFfGFBoB61fT+piDdeZ8O9JqIR68alhWxz9xPM+9+jR4GhyefnquvVARaNjvSO3MnNfrFB1kGBSqE46KerHMiQkhhWqC4/mPcXSKLXB2MAnaUypF9vyPApB5eBZFs3o2ef8kLOs8ndpSXXfVHTulOh0i1qDZlq5w+16ePHHn+TyKPP+XRX7yxSoq0YqXMUvgQsHSi0ZNWjxbpY7OoOLo6GTBas//8i3V9TAKjo5ew3+ev6UM/Xw+n1ZBMM9hPMEqW7A5vymWtCWHW59O2yJ3MZ+SK17bRM9/IAc/KocD5V1eGxTPb+9L+sv57kr+ACUP0NErQ6jkVSuT2JxWRIHD9r/a+5i2gQXSfgGPYCtjPV+fAhFfBtMzXN+dSiC4NyXPZ2HCWXkEnKOjEO7uSl6w8PjoSD61LhlMclyig1eHwVPxSU/y8hgH8o59KjUpQ3IYy848f7OXkCoeNPXs0wA23iKPs/6AYNx4tGe8PZypmgYN71Lk5BXr92cr7S05XlXam8t1cafb3eo+wlOf30oWaNDwXhCcsLgW6oiK1zuq6FbyJS8rbhwN76qQiFd1mZ8FrH4hd4yizNFIQexJRRW14kiZ8I+7jSoQitz3hPBypb1AqXgNcmY8i8ObTgVmkPAbvbATgCYQdqKUp3l55rYNSHMOss6amHSo7eElXECIw8+jset6kKthD+GnRXXLtePhhuzkhsVZcCyFVFAodUsA/PD8HfNoARtgBX9AbwVNxaO1+NVE3F3CKTTIQLUzzZtyby6lDOsQ9rrltBO8zJOE3tG+hR3NvdkdWtLVQWTfExUlDy+0F5jweVmpazxLPscRgMc2FkUlr6qb9sLQoz+Q5kwsm/Nf8tNiyz57l7zKkyWof2YVnkuEyrPkLFzAnUlQNgmv2hmuHmVgqQoyOLV3Qgl/1ckk8k/Pv6hrUeoLQVCBMUogbqs+gBlVwLKUFi7jgi/5MiaMCwYsUFIC/n51VoV5hlZ74aKU06zdd8Rm88sqzlqBTyjJj44WrBJWc/cMxizmSSSPq93fnr8zsKX/NWNgKna+Mzi7JQ7kKOmFiyY7FkpEuYrdNbndCb4nef6FlB3z4FUhhl61Rd//zWASoGJmAgAxsyOe1CzI5HYhDLkozkUx2WC9gNP+qakWiOEOQ5vKMAGbyvOlbjXOA1S3ycmbBWgm5/mfyEtDcbeXFp2Ci6R7/pYDD+tDFeZle/lAAo6XW8b5qR39onPyohLC7PFSvATcoF/rTrTd9dPsYHJO2u/EH3U3U0XSVBd1DcXJLYdEGzC4t9PlXSBHfBmH/A0252+NzXlIfSEMcTftNQDkQ5zOrW2kmNVpHolugM7x/HuqYq7k8DQwtxJmMjyd8giUadVdW38n7qlTXoLWSZhk3mRFoYpo2s/uBJ8XPDsfBEm1KOv44P0gSHg9m5wLAtQu5/f0Ix7aFOAeEEew44Bar4wjLnQAafGi336F6Cq0JcZxplW+IVns/0D+xiVQ2Bo1XsGXSmbpRHRfzUpUD7I6zkFH3WRg7SGPntVxXGwZR09At1+p5LP4dFM7UxZlnha1kOM8/6HkyTGNcmSvEVSpnv9ONS2P17sdCtRL8avDIJM3L60sEeawS5Y5i8AM5f10Wtb5SXjdurePs/pgAhaDE7eO5NXx8kG/qqQsnTJrrempHwGRleECBYt1XeDgaVGfoZR9oV2OygpWpAeqACI1DiC0HB2h1hnrE/On2h1cuIShw/ji1t5lrnB8X8LxfQUt9RK11HcMNRwcBnA1kcvfuioBwTeDhSFJumWWRawA61ew5tSusDq9QIkXeCgViQdDt0dBnl2TkPbyU/TFevxqn5KaJnuKigCU/tCgIGhtUF4keTa/91JcVtd5ERwrFjOpNIyo4swtTR1+1EpC+Nk3lDscmNdoGxw2VZ2nF7urKfGNr0lzpP3nwhzpYAIDXaqwkkbAI1BpIFzX6KM5G0z/u8RlQP+MlkHcSIslXGDPCv7CRvQzRFJBKonhWlUneP67s7QOmv/JrSYfrSR7yoX34UpgFsJO82DAE+DFC6/lwuq/YW+auKQ3CW/dE8QhSgjBZbpH+GFYpM9UW772LrMS89I09TPZnn9DstkiD8K8hB3tWExbVQHb2u8HVXHMsxBVHsv9CP0bdhVckYfHvEYgZxmvW+D5IHiFGt5yvbfWww0C5nIER+D3xD0/bMuwGOUfyfsv8JipZxcDcV4OUl5VbM6vaDdin0fRD3xmX4j165XjQkwHPHPtzoOK6utNFuMBOyzqCqwDUlRFyJPBT2JzWjSzWcq6U0GnHm6qBU5rfW9+rfzy/PsDR4E/5vM4ZMnnYGHz2SrKuf6eDO5/ux+e/+3PoB4MeBWygkf/4BRnErZkQbMAW7QEFoBO06r+9PzHWAFrojjXKzhZxFUBbw8fUjTF8zd7bcQfD4RQUcURx6PjpqUx722t7iu2VvIEJxQo8DBF4fEuCCcz9xVMuOThE/dxSFBLHjYlmGDhjc2mdksqdMt1HhQxD/mWLrDgxtet/fDemmeDavUgtxXYHzRzkykv+/sikGPwNTZ6zyowa4MnBBGfsSapt3tRgydJ783TEjx/w0TAigW3HWW6Nyj5sKJIzjz/JgESlUTxctPJDAt3QRZFpiglmGJRDaYlZ8dRfpJ5/g3zJgSFZXiRnSEvoiBNmOcPQY4F5LotYcHYu6crmBrU0vZm9uK3568ZclbCs3m96PVThrfK8Qkr52DtUuTVmqmSln9cjF9NTivh8AjtgbuZB63kpV/lpkViaBwf9ipr8I1KLEV2R/X8j7V7nKouP+7N/cXwPNdacEmDEFhKJ9HH8v6m5mWRwxZ1qRPIGlB3BHkh/YaatGrSj6Q1X4MTQjkw70dBsdigDsxCwXqDYqHu/5qlA4PTg6X8rluTVEtnXiuH79s2U5gPCvW5VKmBQXX0DpzjzuGXCevTd3g5m1HGdnH9fpQHRVOHH7SagdnB5Jkqbwl7TMoXUmN5/pD34v/SCj/S7kCawL8mqL30YBz1M89/SMoVrwmq519GCSIL0rQo8x9xNj2ihI85R9fNiMu/cIpXvNaM/fq//xte86+yrcXo6wcD3+kx8pnBGnb1te3OthGPc6E1noP/8YizBf+8PBcEdQ609wKUilyKyT8z0jXOBf88YhT8vZMQ7iDvyytboaKQKwJM1hc9A0rbd5WdJ7PbAk2HOIzY8O9hI7YOYlfRCuosdVahQw5cMt6AN9Xn7jLqRl3wjCV1zKv+wNcezJ13NkApWFy+QKO/TukEAuR70jIBNoHjhN8RQgJ6WOH01n57/vt1joeCTTTq640b+1+ef1la9pRcmLKyJJFG1zDuliy5IH4t4vkCLAsuy58RqhvxgRIxjWt0svxltSh/WS2Su7qmSB5sLKtQ3VFHdsS9oSnaT8ANh5K7yKvbirwpRGtNAf5IkSblfo+GwilHi+Gal1OWHUNXlvHpxzChiwOotsbNZb2/CMPTQ+fpc60TO6OgOsvqRQBf8lYvjJr3ZiU7MS7ORGegeHJRvd8ueIb2RGBuVeVNGXKzsispC1oT01Zquwy0VCPB24hdXxLegTG1O+bAG8SRLqG+Vn511vetjZ/QIGkyrJTSUOGE6n6YCvg6/LS2mHOFuU5Jv/AGl3UGQQJjjksqCW8Xd21J2FLobWruXqrreicrpikrelbKit4JwVDYKJ4E91oECqD9EaBX3WGjt2iZFvsHLzzMG81e6D3mvNgguajZHbwoXQ5elC7XTCEZTmKs5NdMOt6KmA7wwuI7wIt6018F3KmyCM0pZk2SrBlsuCsDwzKpx5QmvQFP0Bjp5cv2Jn3blrJxlpTsRHr83HTd40DffNi6moFIsW16RGmDEzaSDRMBdDHy7lHWJTZtI4HLbkVHIp6R5HV1FVnh5EQlXjiO0zg4PgiEEmVdyvbzJJ+yRDE08Me1qFtCldpL50uQ9+vyvJDOS857w20wfl/vrfvOWJmBsFaiU9Q5eQc9v6joUkHf2StQwbEkLzY1m27p+xJkKGZJX5y8um7cdElzXF0hKs2tpeGJEONvE4pVMe+wResEG+2HqXJiwcRyuhoXbspxl9u2jgZwAGhbBFoUXdEL5xJx5aZiPP8WgRKX8XDUuGWeGdBwFW/O2Jy3t/DzlJ2+iyqy98Rt8yYVp4GnLInn2TqOfLG0i4FV8gqkzHNwlijz07OPowSu3067Ih+BS2hecbHH3oji2Uz0LFhidT/6gCr6uv/tSprT1yugPN/WrPa3kMVZvYAKUJ7xfG8AijJF1qRTkECGbjZZnadxeGsIEW7rx6DemamTU26Tx6eOrUdxwAfooWmENZHnPzF9DNMK55nD3/CSBgdl3Cea4hdO2aDlMRXCLd3z/52kP6DE7XDBWnFb9T6DVesE7mkXBvCqPOBJQ2MhlYmQAmF92ppNhvUp2GV1F6bqaUS/Rv2LBRJXsWjlTtzECgMxYYLJxbzmp4VR6Q9vVekPX8EtUBJUZ+k0T4wq//RWVf7LX//0l6++DL74x89/+Fma+NUPX8Hrgp1PnGdGlZekdhJvBHAS/lNvHa/Wrtv2Qu2p2NpqeWfEw5TJQy8sqIByVGU3dLyqJ6rHVFwFaOSHEXoCNEySlcK/48dziB2g22ndQrw2h+a8FsYAnn+g+nPOecbxFl4xLrRonv9Q8wfNWHL2E8dpBXjtt+c/pbAoaGTC+ZwlJ+ysCoSVEwR+AU8/lNXRz/f9IGhmSX5yIejvU4KwWDMjI9TlGYj/vwrw9hNKwJ+zJJAm8AkoKc8HgXBqOz2E+EunbBov96HXQZsNPsNVJbxthJFWxVGQnnKY+1FVf6gWOncCGvesSV22zrAUjNg6txD7eqdVJkXdamRc7+gAp/ZAqcClPZCQL/oqpJdab02jj1fUvFZ12YTylA9SKk6dl6afvNuZD31VDf/5Lc1hNS/rQ0Nb+8mwtkI7tMGk2FMrjLO6zKFWo9IvVw4aRDVdsgOs5Oe4Z4K5P+eKEirBqAZY/2wmldgzllT80VZdNsC82F7T1XmSn/DyHfB62iO8Ii2SMLI/Ff9FN6RhbZai1Y3iN3W158x5LZuoOrVP+XXKXHD/+TtVPKvXqgWbPHsuLdzAsk04uNww7gxRlY7C2Y7kvGp4Iw81WVOAHgodEuFFbvVWwWjtI+SvpojQEOSOYd/T3lRkkbgVfEny8fRclPkcdpRAGunbRM9/QBdnTRYu8IQj5hm6wWjmRPWrSfAUjElN8r4gX9PIaB5rU58H3xLUZw7qPkml6j0kazgkazgkazgga5gIqv7K2XJWHNrk9FSSL+sLPKx/V7X7daljGzIn/fMino1cM//AE9zdWOL52wO479Dj/LyQO+Ksln8t+OmvxF+wP1/son1GPOE1r9/s3nqlBUS95hZm5MZCcrpKLXkDjm1CwFjpsWoBx4P/8PaRieBg3hrcFKtUg5yKnQZRnvZ3vELQsGp/PYT2/G9+nouUB56/jurYTtcuDIthgbhvangrwlIZ7MtJTXAcXbPooFwT6AVPCjRpm88x2lY+v2LQ4agtDKl7fx71p+ffTOMsBtPd9KD3qgmk3v29dAr2jefTaYWGjtX5lAUnaHwKGmRQH0dl362oz73l9rGo9p8riufOyaKqozg3GMLgARi9djkC31kZWwYqVEwksB44r7cPe657VkmzTHCpkjGUZDDMkBU1hBOSUWYmlmVFnQesAK1CnIKqQYnFVOe4oT0c1mnjdtAK9O+JMHe+fi9TFWlQiYPM0VFdnuEd6jQGtcEXOnJxNi3jKMpYj389gkBdr2n1Lt3O7/acTuo3SWjV0JLEMIzhmhI+UVNxf8xEpKM+GEP21py7K7hnGy434YLFGUyZHYou7wnkK93SIZ3iTEQyuG/FeKXtZQ+pg5iwKUXNVxtOr1TjSflOe1zTkGVPRUYQm4Jog9bWKYvDRQNhvyzcde0qAHR9CTvjZXtDABJZfw0Avzz/5ZiWf5j/W40tRqUW8NfJ9XzFUkY3w2FRtEbxWBSZdsRp5fC6uDNwLQFT957BR2UjKN91d6xxGF4gmAbTeqS2OTroRRigbRy5CNmKyLASyP1BpBInrtPkrVyi+9NRIi1W9dimSmAXr4DDPr5L4ORtCMJBeOfRztClURYcL62hYTXc4uP3g4kUxFHVxQfS+cc3TSoai0lD+W3a7ApjP4NDTWeT1t4XCftcsTReVa+K2ksizUqr/3vHcWmk3MdtD0Jwa3ch0IjNpwztX9tEz7+lm4zlMs69vIJeMz0W4ersmJ/dcjioinjWdzSuMB8DyzyIGVWUZvjDOMOi/FUTL1nCs/omxWagQIRrAcN2DRRWWbQtqSXHcCRZYPmIXzEcBwrOj32ThkeIooxTMAjrVZp9YEUdGc80kEeCekRnsE7XhlkBevR1CYLICEEXKaG61xngpfA7sGMooHy8G6dz1P6BfJCIqHJKhDjUJd7vDOxwkzKM7lqaanIHl3rNwUQnzA4mVztC6wB2VkBkJZ0oQnjsqiGOZgmoejAISVNx9F8D9f6vHZi8aP3RKR62VI3rsv9cGPktlThzu23EKBCSoXF5Uccp60jQ8ktd1Lc28IzwgcuEaRi6momLO+Exi/oqWKDgAVcIHxBhyqc0FrQVrTPtFYKpBMTdl6VhksPXbWO7S5/cdZIZNYW8otTiwWP8FdLbr2q9/e4RF5jtL7Q9F325YV1kgiSDfXLH9iVpTUGwkbodpJCPkmTNugIVEsmGRZe+xQXlVNxfhhIGksIt/RTnwh2ajTeUMJsut7eh0hy/8w2SJJmCIUHtoLSJeXd2EkcQyBA1TkJrFshJKS5KlRU+OBZ70G2FgftG+0EwBlq1ZrJlsauCLlzwCultcQWJIAl0Lo/VDbFDtGcEBX5Tubttr887UeJ/cm+ecxEPExhGO46b5F6Q5WsEBBaCNouItI3tHACsAKcdx/N3nGXwIKp68rRHJiGFtJ48rR52wcNjvMJqlbFBNOvDOdsgnIbRrL43ftENd7mjMLjYGg7aCpq66pkJUM4lLhbc4boilynicxuWUpoOo3GVSfL8j/VIq7xLvGKG3j3mZ2BIrDJxtbtvkLofxq1Le7GPN0jt2V+MpNfwn+ffohDdO7fX/q2uW757nQco1bU9bV7G96cJLSI7n8PrF1bQ957h+VqkePn1XPHde57nb6g8TOPQNaL93KoIagT9tVie/y7GqBTuYvoRX122YPuDzeYWHTkpTDDSvOL3HZyxik3gvgBODRD4rXXWqZ6uYB0uismddbjA5IQtQQ5rKpZIW6vfDjq1vR7gev4dhQsaw7BIl4fBc6m3ABuUnt96lqHFmLTTYSkR6RtNsSaRNHXn0s6pna4fIJln8DZ/eysjgWkJe23tNhT4l7ertsUQBhd/fmtrBrfFxfdvabwgbKCqZmre4/7wX6owy4kqP1vVKkJcrRulHW84alPxpm+4YoXkG67oHNHZ9T8axWMuiWf7kyZ5edfhSaHfBY+iMBbMTQcKIzfdB6uM9s67yTCYRG9r8gCNTaCS80GwTNFD50oQLGfC6rI7on8QwHFEmGV+CLf4TRbWs2g2OQ/+HihrfhAEdSIDEZ7Hv+GvDxRjDsju0Uzr2YGIXztDD/jkPPwosrA4exfDFyr2HuUJxvYQdW5Y9Lo8KyP460LP+jGPsxe6xYdl7NH6RoJgFYeCw6Y5hCSt6l+vWHgGen3FmuRNzEy6h+2I3GARD0s8XvcaBbgWxa3/IrQhF8dI6LA7//r193/9PR5BvsGN/XPwKP5e3JZ/x4qb4DDzL3Aq+FP252aaxnXNo3/Ny+Mv84wj80s08haBqP+8gPHyXR41Cb9uMsVTLqGTMv4pY/YqlC/FxezHPUV4MV8Gwudil5WlNhTSN9ks/0PJ+XcQK6WsnE5CCxa9gZMQvPUbwL+Rq+2KcPDTJuD/IZUE0p65lZyE0QwYefdJoXjZ/fyOFd/lEX+01c/3PJsbP/3P+jRiTc2/l9m4vuTCUhadn508z/+OStb3oF8KeufjKOjtgEQ87M59slsN943atFYQVM/f7l235Cc/Onqt/PL8z4b6rk/vQrI9//xJWGEIyupXJ2GViT935Z7WmV0mSZC1G92DR1soJesYeOPWxuekxMXwbzpCC5Fjb5rYZVmetcGzC/ROwjVWf/D7SxGT/aqMCdemr8E554iEjZHwhyJhdwCHaxok43H7lekQRxWdb5e7ig7itE+bl6P2aRLitJFTLHZpGzkJcLZBqcDVBncVlihhV6FJcUouKSF0yFALxljrazLKH6jlC2PPb7XgbWWp8I9UTPvQVO+swvSywfesXnzxt78IkQCfiBptRRLon+uKDWUPfIwNpbtYviBsC1/0qnbTqFDn/Fa1z3MtUCUXgfWN9clhkBgE3VPfzCDxmWE7eNW8on758p4/4IepuX+dFRDfIsCLoOv9hwQ3oDZZojNsh6GJwes+lkXoYllpkTbB/i5oCqPh379ptC7tNEcE7XqkuYHmDURGzOFsC2YPc2Ocfr6ytSTqfYkIuvtYA6mAFtnMkrp/Jr6xv0IJkSL4qXIDDjFOHwifrC3vge8h4hGOiwd++/+Xy7isG5Zs1WCZs9VK1mKe5EKdaq0UrzW2N1xJPFxJ3FZyftlm1/xHTWhQExlKm95u0id5ftwUQiwFiwVj4j8mKkJJPSg79wUhouBMV8dxC86aVEY7EDxh41qyxBgWB1ph9fSMZq3BFKRro8wndpl7ncVvxLM6rs9U04urra0sWqHWOfojX2gtZ4I0PuXRTcMfWfu5Q9jVSj1nq3ba0PyUNTfl6xqr007ttdm+lKgFQicAemR+WpcsrN9HK90mOY9uTtCJrVmuPH2IwLfSLLfAcXEo/ZzBem8ezzCI8DVBSll0ABsUBu+MozuC+mOBFyqii/CIAZavQRSuOfgb0go4nnW60iQv0YRasqRcU2RzubCU7OSK9LVWIwhtShrcKON9SdUFbanM4POtO/meK+pQgJdnixxUSKaZMTiWijQ91wyO2D6pcIMoZLbpQ64bAKnh+0IJeN+OkBB8v6TFkp7oj0J4/qejdbQX5Shbshjti2rP/52r4CzOBh+NfM9/PlLe8dirWnQnCdKJ0sxsnYrRWLElv2kw8No9TiFWpufr0aNEyjix6Xn+Ld1I/LX6EyICaFxwet8kTcZFkjPPbTCOPdC5/NOW5XiLgQqe2yRfGit7/rYZTsCIRNm/Vht4X/2Jr4UBiKWNGdwfQp6OjJ8WMl9Hch4ua9D67F00NFyXF8xoTV7nMuhyME06BhiUAwP+/1RlPJOMZybjUDIObcZTyRDPuCRSJQYsxOupsD69WLIM7HBbD0fL5J0yN5+Q5ubSaH6NithZ8tkNg34QnJ5WIjlixwH0aXVB+X0QaD8nQXVFszuH/YYlf0BJCT+KkJqOjnpKIMy/SzjqDx3m7/kfSJ0ahOZVzNS/V2Svo6PX6k/Pvztgpv4VOE3F9Znnv1/kBdwZv1Nk9U/SRh3GxAXxJ6QRg+ura731ulRNwZ8vVhHOpJWJMEVXfrx8c3ty9ddK4docZuS628qKpt3OZLl9zH3P/19XMhLPcGMK2su71UL0GIUc1vW/XaWuqM5Ze0tcxlUDoT2bLBosO5SmokmLn96qrO5ca9brdK7VgZczBmtGXca83Zu3TQv71zrB83+zQoQ+vEHHsHyxPHSCwYIIwyKFG7BYgL1O3J1tquby7Q2oFE6uKvMersrRPv+yZlCPMeN/lU5RIXUSVu+l0zJxWM+D/zvJgOPXGkS1K0ClrwdsuQv0OANjx5K3p8JKnM94h7o3aJQfgLlsVITpzggsTtnVHjJv4kj4airlpKUJqg6bTIRXhvPxhgIRIQtL3AlYWRum/9ANmk+AEowGTKabhN/tLf/RwKY4EGYXbXPFs424NFivMPC5qgVXjNMorA+e31Rs/y1/gmeUY0D/PEiYB/Z7UqPfdvs6VQrOHztWxOgu00ck/frXbEic1fvPtyx61UzV7NB23QzDNnGU7uKoYYlHpOsVY0f4K3TAS10skVJqYDYUijFGriosDDUE+L3WPWIoGOW2DUKLZ84KMLDNm3qPDGtpgD4hQSJksNCUILESljv1wgc8S9CQg6sjRzqHyAkVZ3MIOTSNXzVonogOaWgrAHXyDE48EPSuuoBEMKlk8Nf9LkiJ7YTdh0jzfAjFuf90b8ApBATpOdwIPaYjer2myJ7/a508xbRmtN+IwvP83YFyLfmu7VXy2iRpviMtqjOqrg5MxxK0RIQMA68dHIxT6SjT1bvpDASFQc4dPIgUAAndtEcQmBB82/ERsxkYgIr7PLmYgVir+LmUJ8fLX1sx3XuqAX1OQgX1Vhf+XbqpVBDeANKuwBZxzY68Gv/E1zRq1h1iNzS6FgRLD5ClBMGKf+KUr3UXKAUWNY8AwEUA2qqqqphbBDDi7XNkbKomE4F3sRNE2w3HHdwIIWtYjTnlbxDcOIMrnzsEpzWoh6evEXyIsnXZphuRvIR7kRK/1nQqguDUXUSVbRpTlPmUixG3SSOmfB5nj0he+wENsuY+hMNIdQuS/gZPVRCYEB3y0wLkR8VGp/fKClgbrV/xjcqEL5DpcKRF6i0W8YHt4PRYhWQQpQYDmZnZCWRTtYBnmBXBrtGnjC1e20TPX+uX3y6PVZzV/m/qsuEvZQ+oL9uhTPe4Vl+vZ8LGBBdm8x6qkEWTnTUMPNOyivD+mlB+YsJPyvg+0iRsln26chFwdczQqgALa107L+oJ8T2faBiepqzPa0LAn2nOa2hmLtvwQvZwv6CiwwvPQs//Uislrx0OjcbLS1XFswdca1phsuYPVqlkEcIBYbIKtO8sWCnI2ieKoVv/Ce+qUIaLPjGuNzTPPM02c01j9T4N+7TnnelV1zGUmH5mCQy7AAq2LyiHvDg6HXHZUxBdwqKBOoSrVXtl8SmFp90LdeZDgkc3sNvQDKzIRLDl5IGzYRpnIwB26pEAgrhHAuXlXVCJYAW3NZDwK1CuCizXR+kSaSbK1Vwfexc2QMOnNt3qLE9JNOTXvDCN8IxdzxE8vedcgK7nDABB/GLU0fL1CMLzfzvo1UiW78o+JL0LqTJdCi4Dq3SL6SzpbEP3+G2dYSGth6r+emA/N8ttgJEA/q4JOJb+wUdHr9s/iZZ0S3jrHykRXUIziCd4dCT+FkvXhhvxicGS+b7a9zXoeEYh8erj1jsM9oZ4Gvz5WGfYz1LInn/VctKcv2LXDCKE70q4r3trlhydFPsLerh5hn0qbB2IW6Rx95eg/qDmrdxjwlCNhbbCQdz6PtsYjN/Fe+CaDuwC5xsPiXgNrU74rBabBZz8pIAz7wKERkL0ruSJOa4XWzZEefO4XlztAbJsXC9u98Q+VRpmwM2AveFmfyzdW/EEBgrua6rvqxgIJTv5WKXCfr2pEsSW24H3bJ5QoUivKxFA0gbhmWFW7Dk8ZLFPQNMP2gGXo61IvA0I2Sf9Kt4F+yyXvMsz0bHljiEuo01md/qGspskU4xhuqA0mbhrMu1xENeLawZKGO/LDyD0pNBRWyqhDS0rIwxjmt91CgAlNymGTPdm+B9DAhPL/xiInn/leBmAglusb/CX53/YxqWt4rp5X2S59S+brsis1vOpZnmG9CaLXzUcD7qeT/oSAxJUpaQfMqtEXiDTNbpnC9+mq4YjMmbV3HRmMOura3lxFTTgaROisSrBRXsLwd0zvZ4TcRddQZ6n9gFtumiMkgUxKl7Lvzz/HulxXEOyNNWD+SkJQ6OsIolD4dumFqDrTdF2WAE+ImGJyC0E+mm1zskgOONzEQdRLfJ4sIiw3ujRD0g0i6LYer/2e1IZUdp3l9tI64X9Wvvt+U9aGAaCV2rHfKwGrc/NogfSZkk7AkJWVMJarXPnhh2yyrM4m19TQGgHgD5u78NY4qy4GL86gJtXVMbA9av43W09H8M1q4yUEsAbX2p1513w3k86g6IorsKS1yIEehlPG/go4EbxUtUuPVohcjTaqaGXxjAYXTSwxKrgruZ7w2BhKXfv5aawXjLUw/BOnv8hdlsqlueP8Ud/mV6t9e72bc7ROEnyE8vF/hXhYv9KTecu8xqA4YfhkK9zPH+/43SbsfkAjeFMGv/KmTT+leff7hJPm1auOG1udmxhtqflo75kOb5ckIlrQU1Z1eUa/hT7NWgNYBcPirq8QtCNKAT7z3VCfDC5pBFglf6woxzzM4HHqw3x9H01kkCF7hZBEk+NEAM9w/MPHbEHCmnjj/f5pobVdxTCDoNgBYetRHOlT+J7EkOU89nB5EZHwxBiSnJf4eAvbCIwyREk7oZ5fNVkYCoDQZTh0vE/EVFdPipn8VqXJBgfAbeoVZwdVzJyOxerhsj9jYpgUGVe7HKGiygg17rfUmbB7Jci7nkCxjKwTrXR+T9us2fKfLvRZkuA5S+eN3lTdU6Zl/RYC1kXEh6fA7EZbii/W/NS0Q2Xbc56F08eXrb1ugdVvWSkyzYx+qf4h0pHEx1B/9amH1r0Zw78Mwf+0IE/dOKftvinJp1qv6AfWvSJ8tz1ni7CQbYPsBhtTTd6hjT/aYvYnLZMm4arj7VxVQb2r7kSneyWFu0ftyw0yAzQxGRd4yrx9m9RgTe6gS1GZXSWdfMCreQ2LTI+D3OBixGLxwWhuLzWJQrDHK6Yy3X/uU2dznRqn/e1pwKmpXYRQOpgP9onLaaN14LCIAKL0K10WJCYzYVJ5+xgckFCkkmcBvuRzHjGMkwzrofPkIsXhn1GS75dil1CBIeqbgX8RxRGpjHhS4xdc5aFizKHiyYyoxpM80lEsubIuk2x0OcHY5kYWRray7q8ILM79I2hsupWVlbdDQIlJbLrBCvjJ1RsFX21wmbfoWBCXQvnsmrHwW8zOsQ/8aEoLrEM5BI2pR6KBbyoMaE1Gdtlzuu/2JFdxBmx73oZtPLoaGWobyPli+D+L+FQdktDEh1nZ9gDdYQdJkYZCXYRtCiggs7sr5CCQw8i41slUHWC65ZSqPJ8vcslD76FlQRwJk0toOC2i9m14LGGEAtjWLfbXdVF9BFb+w0CLWp9TwScvip8TqpjoTwTe+sHQjCFTIvVJkZUKnGJNXGX59NsJjO4BjLlpDjbb3m6c2XnedP98e6s5KfFuzMwVbggolq3sWTenaV5lOyjNCVkfAjlwBL9YNJKp71YdkeUsMR9gfT892ZoRnmFp+AsKdxupYvkZT3ED+wOZtSfDP83qBHH/6/qVGFnaBIx5eV1noosKiAzwXeL0OBlUwkKFFW1vMURdpvXOlWWCJTNp83c8yEdS/1TxeuLkbh5BXm2ZOXZryIhA1VnKfwpc/V+0Jrf1bNP3w3PwoSfh1UVvlHyvXJCECYHIuvGW7uvtvFz0OoKRT+sv0v1IgwPQb4jc4XUZTxizvhSSSaDdWHgm4DVF9UUM/FPvI2xokbywVktzgsbBFvaT60TLHBWOf3OlYkmKtmsVbENJKxRYZ7/9TAsrYvRqtK68PyRVnE2T/jBaFUCNlpbe+c8UpuAKSGQFJgYoZgBr8yn1Z4DItO/JHEa19WuAySeJs7xXegmXmuBZ9rwRjIMk4gQUPIqT5a8kqMBLNHE8tV7CpqxmcT/Vw0qCpm3Bp0H2+BFnWYnmDYRRmVBK7dI+EGNB32q56NBn+p5F8OICtPUZHWcoFyZz/zxhEmoKx3OlySRIpDUCkChbr0zBOT8eDRDU+voYOdfUnLTfmbnhOq5L154rVcerDhPtQBlrKy6Ag7GphprDOTkkmegXo6ruN6meWgUMD0LajZ/rCJCMgtvR+6DN1Ehsl47eUrmXi27FE8LcGbwSCZBJNL2Sv+jazaHRdF1SRWXJ10g4XZ6ysRVXabOiUK/t0WDjPBbbd9rwbVkAsb/6H3c8c6tLmMI4k7uNoqr/HBmKgls3xcta4RgEv/UxXDr4ibgTX7bvX0krt56vY3WhYNlzwSiFdChDrpvgrrpgOHBICYrxtX6xImT8y8vhc+ZnNp33PiSz+LTbSc/L2o8rd/UEGLYCPvBWTrRAplh9DCDsKb+lqIgSMrtek/EFusGxXUqT1hwdoMILXbCyrQp7hAcsWpK2zqCj5tMk6Zn4mpMqbwN7CXH3ZoSqaz5VCZ8hNiUdASzLmfNNs2PeIdY0xHSg7v59M863RjhHW9shGtA9VniLlDcND5ZIYZalHf2mMNwEUHtdfsnLEXj8Cpjx/zozSKzgWN2hvkJ96MDo+hkmajGciK3DE+LvMQbknIOF3Vk5DZ8HsZUQo38TQUkpm5nQZnqsdmUQHDteNEs4tB84QLu6XA/uT85OPj0XPvzH98q/lnNy9TwPv/rW1Uk0zjgFsjCmpdGrf/8VrVmeYbR2X74yqjuj2+Xsy8E80krdNzbJQAEFyNWg7RGxo57y0rb7pNHZ6PSf/8vViq8Dcmq3+4DsZNjurq3G46QNNOo6Lu3q6gCzzU77uDb5VBsrYLipfma379VfX/6QSRkhPCDRoWYc1APmiTjwzVZZQJEwCOjhtsGwAhz8yuhbAAFw/XO0DbDNe54iUe0ayZZqIssalQJv8fbfcg/NLQwHnio5VrM5HfB2C5BnLXnfyNYyt3RjItwUTuMkpH+xoP34RPPTWcV3it9BF4fzw+lQ9Vv1GSKKEtJKQQTK1YxXNpSZM//nVWSlfMGw7pbhW2OkcaRSBNpkSZvWsDz72qpIpW/X/c/jISVRvJJoV0puPCalPEwKs+/P1BGjCTJlErB1syfKtadizsUJuwmc2J2WP0x/mBOTBV5WWhCpSYatWyXAiUp8lnMk+iOSmlzprE4meYia9p1HP1FoFxEQpztDzC2owij2EdvrGaT9SDAVAbBlLWq2GoRp57/AcZ9CRdl1kDsxxJUhHE+mX3c/x0kEBbIjtYoQjJe7elwXS3Ujx/3REG4BhFN4iVGVOn97S8GcHeXsGwOknWQnAuCtMlSVnwkDStQyCnfx4SEs8mHgTQwBJOLS0GAaaVz+bo8AgqGM9IoRVOfhB3lg0BclEN0BeDOucGN8Gqal+W5IIjiZT07+K0e77HN5ArmMMIwSQn7CPddIUqtGa9qHv1ulViRkASjyVg6lTfURTNNwGWGVfxdiDlXTYN///d/nvyG9I/LcmG0+5vO9Per77/dl/4PIhPJV//87cFe8DRMvqm/+upL9v1fgtN4X+Y4gpz30JSf7REz5yPuQjxLCMUI24OIaPnaJHn+DRv1ryyuP8/O9r7++q9/+I5D+savv/2bsbi2JpbfYxRmEGTnhn63Z4ycR3Tgk5O8PGbocA/PEAdj3Anqpsz606gMlvzhiXxp8H7+SP4Q8fw/kL/4aVzfOTHMKTFNaOtQ7fn3TL6Mt9Nb4OB1iAum6tRZdXzfhLFQ8OB6tb2fyYvqlgNX8pJlx5sOLuyI2w5eb2S05UB0b+Sqon8XV/OEvNF2tiBeh1AaQRfx49WnARpUCrLMdSFMY4C8o5GrZjqHEJfwo4QgxGiKqUHgFrMG6yLk3dB4cdRXfM3kIPUKUrFv8pNK0O4gTbmDxzqE4SzwN0x+//hrJgupl5AKh9CJfOxVlRKdCOIaXEepwWFlENfrJl2Ee70C5HZ6yom5odJ+ELf28mrris7qg8qK6LOScrmnfM1rDGl7ub8la4tf7EPP/hX2iMv97+9Y8Tnc2N7qSV/z+gvYy7/DFNQ/wC67roWqxWaKh25RpgXCpqDkYV5G/zYQYFUuL2boWOfyogP/YtT8s1R6k4jH2imtNuT7tUZmCmu9ZYHw1uqMQdp40JpbxFUhQ+FUIaTEs6n/RhGNt+oQY2+lAe1goV3Q3C7qqREsVAfYkT7t/rUifeqQP1hVdNuQmQxbVAEOhhmXJxYM6Ue/Sh+hy/EqOsAVAXbBSnd+ch3iiEKrRYClotB2AEcFYOlbD1XQAewK7JAyRgU6gMrSnkplibMXdIgr0Tv4Qg1UoULs15Bm03V+7HgNHWC3oTfPd7ZBh9hVyKCWVe0e2q3FQuaYXv3O647FqwDIWLxGBVQsXgXijAes3JPQ8YBHAwoPvYQCUELxVrweCcUrZ7NRBm3F8ddAmc2+TMkhcEkfQfrlus1DjYsZJ1i/knLECTbKCKt3GL8DZT7py/Tm7TE41UBkJZbI5QwPZ2+Az5q0aN4MH7xJezAk6Rvg0zzjZ2+C51XF3gAfwqnnTfCg730jfMRFhg5HLGh55O9pwiDHGDhfvmEkaZEM2ajkxdtVIsb1531htGkycmMoxfppq0OUfXkkkrVcgeoyXsaWJlFpSG9oJGPr6lZGXfBHY1N86xqw157ogb3pGoKgqvInRnjtfrA8ccXmNiOj94V1jjIeAnkCEVZ7loyhim0Gc6QSZdWyK6FGplFJnzmdqERnvnBWYm6RWiXCbm9XLQyxFyEklRl2W8WgPwEGyn3RU9qxhwkfFyyLEi4u+ALhXGhAtYfaYbdxKq1rq0OM0DlYRPxx5TDcQoMd14uUQ3IUvI83BKxDrExqNIzANXg1gEaDL3oAFHqIhaR8IjM69CG/e/OKJ10wdqxK6kPR8hbPxaha3xkCSNtKDNjdBYQXWkc0c5TbVFMk/TLcAZN4GhZF0B5+wKDaWFT+eSh6t1hghkN4qxjP/34sovhoffkbVBivUmGsV/iHwQpHgp7H+WrVzEaqmfVxz1klPOquCKuxzvIM7EJe9vq/RV6+SVhynGPfkRHQB2cvL0F7q87YbqG6QtQ21WlvGaxTPLR1nDQe+3v9EeqbrNAPOMbXXVU80hlqEPY0zoxaPjHBhhG0jvb8J0aAdxc8FvDfqvB79PE7JtZwWEA22tjwaA8sw5kJR9arFGu3JYrA+mLDEF5nsESAxqTaGcAIX/PJ1gCEzdKcb7gBH7eshAsz5g4bFnXVm30F2Sy6orDayPfXVJow1TEqAWXhXJrrh0V9w2axsmRnnr9BRdYXvfdOk0X5+bo8Eyawa3UZp+AXjNrpPlzveheGX9woVM1UmI5eNxiCWt0w4vSLmzMwtP6bFaRfVyvZKhSHWkkHXtUD+4tg57c1Yush0MWjezwQ2v/sZMFLLcb/h2KVFd/4I/kDMs2y+oPuF4vavyGxWft3FM9m59oMavAHCvDb0kJfRm4MUpaxObShgszC8xCC2WPY/TZsLIbKXgaTNYK8WAYTCr4IJhsEGe9441BmFhBBryDQXV7VbfDPT6dx/bHgx1FYi5QC8hH/9sX0C7w7++Hr30N956pMRHm5KvJXy/ChZZyXcX12ruL1XxYlP9kwgvN3pmmebyYC6KMNmoUUi7YfNJY+jnrWyDjSgc+IWPsQlKmiw/Qjy/N33aXkUPT8rx0YDLSPn8D9iB7j+Y9WqKd7qOcC446kAPcIoLgwUkC/IUApr8s4dHSPZHr+3aGSXf2/JVDiqrhk9ANaruffGyzbPWI2CIN/6WHExrTcOpAaRjIaO/Ua0sOGGkayVPcCBxQmnToGD3A8f8dZZvDTwg1dmbsSVAgm/Wm7kl3990eTZwjnBLIdZJKNLtMFGv16/oNVS3o+9XXUhBpNBXar+lMcL6qWwhegZhyRrMPzX44AR5KCUM8REUCMEb9pA7u0KN8rvJ9l3KsJQ3B3V6f3hsLs3g9+eP4djaUlGgnqeT+CBV9ERaxzkblPnn702vtzbVDnXyks8jWrJB95zZf99xf+P6CIPeaBvMuGDyPoWwZKKgpQ5YU2JbcNwAwMheAljo74kiWPSXbWpLaQvGSJ70T3AVQFcteJFOFZAGO+YY9pPSUB9YhGoaUMhq/pf/Y5VWjwwCtIBLrlN1Mk3iGR4sABNdH8KQZgAT7Z822L7e8LRezv21bS5pzpbAVhPPYD1WKDaCXMPbZHITddCIiqds1gikw4bRGZUgetzzDZC/ze0JlzESgDAtN1+ZKE3N6F6mrbaHi/KJO5XW7NpDwW0Q3NonZt7l5mh4S2AiXKedsOCJeWmJ6/RSOgdwXEdwAKEWdenF3QqfChO6MQhtGCVrVpICY0ljUZBAUHaVCsAhBJKdM/tF5EZBvhmzQzi+t+UTczGcHb7ZE8BmmHMfQ9NsV4MgalLEEMgkG8YTL7FEoWC2OlcLB22qVYmq1PL6W1fjt4NAqsLb0dldKJpeQZRoW+rJPRglInYZyfmJ9cluH4MXGcsDX9oySZGwASlasF5z6HQJk28w8/S2UvP67YTAoawn/0g7IBFQoG2tqWu7r00WzHmzIHL2hnuv3rop8CvOGa87ZbPxS6CWF+f7XkIUdH5LyOZxi9Lc8ua8mYasjoZJL2g6eXzGRQ31qUfYtilnpulXpGUMx6nln1HFqlDq1Sh1apA6vUhKCYpfbN7siWs+JQJ2HMGzvZ1WkFya6uEHSbliXrZFKsks+uWwySPBHkG0XZZFzR3gRyvFVXunyEcLkiBtY5lLb+XJdX+9xVqAXCqwQl8RU/LVgWfcfCMq9+EFFHl/ybNsuNK0GW/PPPIvXCCOqbLEyaiP8hTvjuCBQwO25M++uxEwKKHnyZL/kMYxPkWeVM8yWkuC/jkmN4N2fjUM8luujWQCowz/dpLsgcWPyrLvrfFo3s/74is4kFIO3Jm6Y96e3MT3nYYOIqjPnQau+yuCh4fccJijBI4ZrDx3lTP3q13ppY2w9Znj3+eW9c/mmsytXvNH4/pL/Py4iXHAz0baOMtif+4z9/97ZVyK3gf3+78g/e9uqBTFj2+co55GxrLkH+h/9qDX/8L1TAT0NeoNGw3OqWb5gTb6WbVS2HnuxGaaGSJHhHunondKn48ioWbk04xP99xXR8OGmFLll6MltjXQRI7lz4qn/7H1b1Sm/tSAIYQv6elT69O/OfEM/byA3/uUplItYDOw0guWWXts0xuoQkLAIX/rf/QbXjxcxffvbKj/lZ+rNXOgT++XsfnRiw7z3/5+99DGElLsW+WCkBJPgIYXgioqs9f6XEj91qdXT0uvvb8/+3t1rQ33YbwP4w9pTBiTxUV5vJeXAbGaig302/e8sa+tgT6t//9DPUJs25PnvLqqQl5n/FTuD7tyzsZP3mLStk9f/9lglG33jeOqarVJ4Koybd/ODvqmm6WPD317Ruyv9dNU1n/l9/T03rtOf3Xv6ff0/taoOS/x9/T40CDfu9l+tm+t/uAt9kCCsZUAju0SwRMabORdTa2yZI/33XZAs9RZCwn86CaVynrKg8/4aJgouFlEcx+0jjXMFfMhZoADGT8uyyRmNNFOf3BEkaIjCxu9u0v/RGrKjq1tWFpvmrU12oA68rlWIHVWhLTZBBrXHNJs95TYAhYOWGSRZGBRjtgWTZVPQjtaid3F6JoEB2OXj8pklVTERu2TzFEuSvJvdn6ekr8qcacX5byWEt3whjO8m0ukVePXRluYYMuM0yUdVTTmxV8+JAx74cxUK+gebTQCYbmMYy7TQEjz6YfDpaPCxzGcBomggZGl16nVm7u4Iy7JCVtfupq2QKKbznSZymXNPWOdsIQc/CIl268oM7nwRrOCY0iSCXfc96skIqcvkYwDxeAd7T3a3R85xPoWVzSIPnLICJKnvS4TCQ7pxHrkLCIFUfZW5wxGdxWB2sNHxlesuVenwWn0Io7fgnvlI7IAS7Cf7ECZYZIDEN0QrjTMOLuMblXORqjyHn3m27IMSNOzoSni1iWV3wBAKdLOOI57iu3VTJuJzkRd3mqN9SmWK/UpacaTMTa6W4ZxNppEDltdFRcUMK2osgVsudQARck6trv4K3QXwhI0+ZF7KePlOV8stgJXl+3BRi0dvUWdhesVl6/gbBwzZ6vthJ5UtiHIpoUyX1740FPjZ5GgF6dl0hyMaLHxfF3yhIAPAL/C26SvviJ4u4wviIr0cQnv9wtI6e+p0L24Wbq4rjgYeqMM9/ulptPevzwQJs7MHM8x+M1aDcsbigXaw7Ff2VE81Kdsx5PdC4FuL5n4zXAiE/eBtn/NE43lyqBsF9NGvP/8YFT+M0F/SBd+pBnu98sFqTuc+MwNWW/ourQJuOuCo4h3t0Z2t1oOdPVq3R3MNWKKK23Pn9RDCXRhuQzsnexVV0v59ADEz2ro4VJkCHVV/laxc6yuvqIMth23S2r8N4vvOpSj093fnUMM/AMn5wCewwA09V6unpf1bQKU8IqRx5q0jlHRAH8dGRWOftGgVnlRqxBnSfUWLqykyCwnTiisXIZzvyzqnC8HadG0fZphiIf+KPnZAwz0JWtxHFRLa+d1IWZxdSFpywZRBVAcgfyk9Yva72P9GoBvMk3NCJmMNK+DgYcLiqz8u9lLU+ABg6XDoAisD84EgHZ4V7NKgSIhBvYbs0DMM5t5i7NKa1QJCoHRqltukFDRFBiV41ccnbk9+sZCmX6U5l4afuwm1geFbzLDxrC3ziLiAeYuAfuvHgZYqiaov9zI3lpwUPIbmRbBXxKjAm0uJAHSLyZztE5E99iChEY4goHDFE1lti2V+k4LMuQjLVhIXts9Xf8PBryu/+6RsGVXm8WUA8H5oblTh0g1x6lARVHcW5wYGIcVIaNjjQOpojgu8hZ0NwsAFGdWsGC+vL53OziPIcswg+iCiiNOAOsEAQp2biCVsO8tPiYGuIDw/cowAiWaE4Q8BTxkFpcXB3FDT8PMzedzLyvBY0+LwWBM/bGUbB08YgaXGwOwKBJ91yYuAhA9y0OLjt5kLV3eN52fmGdsNRehG6MDj+RjA44CTmhoaBFrTIDYVjTAaTZQ56hYXPWs4qswg16IGFa4EIH9HWPMSHau4O8PtF58EISlmExioUi9IaxoyvFnmTRAGaR4s4ij7lqGu66aIB/oHTr5eCC6P9i0aZT/qsqNysBY3zjbSp25AYMuUJJnKoRcbfQDsRXSEQ57twnb8SQQkgzNwuxFrqNOfBSdG5LPY6/gcGRjU9NKBGdc2cqO7hAKZ3nBUu5HurYO9bIMw8bdA8367s6MgiGW9QUR1iVISZMS2Qb4OsZgHR8+9RSJt2UycVCUvzSZvl23ja4mxaxlGUMbtd74NLyMt7/iejJXga1wFQjlNeVsYTpoXy+eG+BZwOpjEMtPsW0nrxacGt74E4i3QFKTIlHESgneXlrT4GauvzVHUyX7Vjc03Kpg2BsLAlbyqu8Frn4i763rYZfLU6iWWmBilBPrMQUiCUXUCxPH/XXaqreQDTtf2WiSkrpQaS25X1TG6RV8G0ASVPAAOyq+auG6igbhOoUXbXmIcWO+FED2KKLLuqhA8+Cdjdkw5Mdt6A5rIiniY5nr/jLNM91Q3pnmw1LK3YULuR3ZX+zGLzVE7i4JhovMr2/PvDpbtGjOC61nwxgIurEzbcIEB4/oPROrpmjUO7llnxknvoYKM83xrnakn3bFBRXSse2yiWkc8HG8o7NNo9kRM2xu1aYg3MY4gyPlOnrrXKYSqjxSqI7jHWKwiX5K4GB9/dYZDkkOgwIBMdJtDupwl+9zTrI4KNf2W22VqUwoRaJsKkIhYlxHZV7ZFRvCG1jAL63WCob+LJGt/zrRXdKN896B4JPF4aK9IwzL0ytTDHQqCyiZVJL+1emXSce7xLnAL5LQ0Zbq9srqNPzNYOw9zLqIRhlo3B1rQIYhm16nAvoxbUvYz20MFGEcuoWtK9jKqorhX7NMrZAs+3Vqq2hHstaxHu1QERuETQ8ll3PSptJzo57xMnBs8Q0vgdlmPwgC/5k9XxaJrjhqO2WusOA4FCXMyqrQFEDm/x2AkAfbgiNPIs9PyV0REPNcGKRmsTjoB0ItrDQZguDLl72cCKCeavCB/qbUDC7uIeNIAQm9vw8/qdagwp4s7DwX+ooyMOPul5Uz9yQrr0P+RW4wKLfcL9XbQMROba6sZqC54TJmt0f2kzpdHIl9bh2iLnRK5UH35Oz98AJPrf1XjJVXNhOVHV5XrHinjNwx6x1jFEqJCWjv3Trxq/xqwl6jry6wDDBKfx6eNxaLhgWcYTQBsVP7fQz10VU1Cl4vs9OmXplGloQUnYGS+9UdxEAP+MQFROgE5Bv1fseSP3ijrwKvxkJZqgiC8D+YGFS/wyD9kUM6pcVAkVLzRAyqrjqyoBjZL4KcirOhHsU8suSkK1ZvIxkgYvSDrPafw0r66o9FmcBlUzs2m8sGglQStKbtNAFWnQ0jjSemWaV+vKb6mpCjiEjqEZYPKrMURMGVAP4SRTOCI+gqLPE/ey6Kf30IWEG+Ii5iHHXPa4xK0RWNhyNzX6HAOkiRTiOIkVnkjsW4AVV3asV6fEQ9PobUQ/5Mo3bjLh66+oYf9FTfNjju2WMzq2VeAF8bNt1SUZPfYsCxdlrrRTmk1XAeSAyGegq45udNl14H6PvxJWxnDnYnEw8gRwLksOGogLze/HGonVi7YRvG7j3N7sKRA7JRNzHdpR8XqjZ3b5ayqBu02yROE4K671bJkmFFbntZ4qXSkrDMZ03aIH4ZKHLVxG5D2tQ3GBft2mQypbAo5RnDZ0en1WxCFLsMgmzcJiDh7uC+sGLy8CYW53g2JgddsUp73ywkrJssi5bXPAxHOeMnyLO242PnqA73rwsbPRx6ONPhacmwaHpwVEihQV7zmYWt2uGshPAEyseotgaNVSJZFxRWeIhPM6reAZXP/wSnBvurgwFpxFsZm+i6ualLTHumEkNmVvDAWXmqNVYT84G04NRoUbguvmUwcbLhBIxmWdTgzoNC5zWPCC5US86203f6Q4NR9UPjXuOj4+e9PBhAe7CuJTXUxqGqVx5lg3BGdoCgoE9SH7wK44Pm87ufjgB062NULvjUKx6+6OwmCMjldGDUMFhmxjj8Ab/dM63CDIcmVfp1iwBt92MOQa6ip3vEkx5Bq25uDdJOjdTKEaogxe6nktm2okDhSPYLQxzdBBTOajrqiek0Cqr6PSHH3CzB22d4iuVNwwuSJJL0vNPVRy0PuK5FCbvGThUDD6pX07HJIbNA+a4WChGxbNosSGloct2XbwcOFEFwTjO/G0qM+oThEMar8THHVCGWMtKs9IMQro8CSCDO9M1IKPJ+jULot0fE+TEVdyZTVrAga6MBB0SohAhrU2bQ2A8LF3BgDQfUMVkG8KAGphFgzsA0PSwLcx0OGCxZlo4TrFgU91jWSQcGLBF4w+DijZAGzaXYpj9fT2EApfZGsIAX09WAX26c4gAjuXfA8svEZyomiDpFNfitp6+jWNFBkVNnwzN5f4RAoXP4SbjQ2742bjy1w1+EjU5juemrAuKZZJhTWexuXAKng562In4hvLcyacMIOUnXq+1E1kTcrwu8qzcCbP13I8ifyyp5j6S4ZQRF3QQtiM3CNRFm2LgqGCUP63RwGkyhAeh6BPVNAJW/bajoiHauOEGU21Ml6+zNEIfoD7YLio+qpPhqHmS99W4dKRTx7hoyrIbg6x7+rM5DjmRDeNoKgv3aEs2hYFc37pFmC+tKeBngnTr5Jo+zhQNv+RC0iR7zvAZjO3dRzRvgGEbNhtC6H93jHZ+OAXddnwl/LHLg2ZsaTqMFsmxnwVbRCgTzT1OiMoaqh0KIvmUTBxa5DWhfLnlhNIjakWMDimIIDVSkNFBVLkXQdYbd59B8ZsoU/iJsR3WAEpX+aJE0nS91xw9X3onpzYL2S++DThSUq8zihOvswDB46g7tBQ9TXu0RDzJXRYmidJekC8wxhMvoJHw2ziNglU23+XRJjNf6ijWJJA6rZjcjVdCStfZDKAdXAeuYvYq9rjMbC2vj1wo80O+ViDCrNqhcDBfQkMHkZGKYEjR2mPI6g7NNQ9SjuI+VbaxMUbTOINSJBJukOA1AbtEvzBlQyvPcHhmlrJnjiRJN16gxbuXJ9U0GinPV+l054TjbM67flIpz23W3NNw+SFuF7TS2bRPjHidgiMQbltQ9T2ETUMSggln7GwHtv7O5RF26Jgzi29BZhN0voGvjHx+QYxVP9JjEG5bUOc/SfYg5shQA75aTG2zFA42ehDB86w4XqlmZ+9SaHOLuyBq5BNvUtDZVe9FtPTt3pLQ9nLngWRhloJf7QCTByHZrPM8fIEGM1UhMPq4zcq5K+AXoTSUmQVZJin0zjjju4YXHcxxsUySXPqOPfEiSTpey64c91VQYMilQSOiVQEjBKpephN3CaBTpGqQ5jNt+bDAUYHoah227I+F4Xz0KECKfJDB5g6PFnrn4qlZC0bY0yjZ6ujlXlkD7jBUtYqKOGjq+oBPd7tb0aP9jTn1up0YI10e2SS49yeNWPyhQWSzSdBJukOAXIKIZI/eEpGzDOjQynNCwl0juxndNcD2R7Zz/rOHx3Zz6wPZY9sDTM6sp3owZE9WMoesc/IwWOvRaMaGRtFSWUdyqIR33QFjYwGlP9NBgCObiQ+vbOIPR0IhY/10pPVto8JtX1MiO1jMrp9TKjtwxoAE3qGjeJcS9uEnF8TammbjC9tk9WWNkr5RIJMkrVqTUZWLeIgp31DJWDX8KpFAqlVSwVS5F0H2KkEVDDmq2ifqCDVZUMQ2fwtG6ITblkAtbHbFnfw+6OL9tjWZoGoQdKCTNIdAuQcJJI/uKAihtqOR1DUgtqhLBoJs3Vd990wTctldxWxg9svQOldRlDO15wQrznZomDq5zkYALRnOSCqRu+TVcuIPQSK2P1DrBX6my9ievEdQZH906Is2q5BosbdIIbSU0iMQdmzIfZ4M1+OHm1mi6hhNIhxtNocQot4ctuGOLUrgj14JitYNm+EzTPR5lWgsulP3VCacddZQH0f34kyX0vfhlgUJRyjupLkXQfYvQ31mMH1PS8x+sXw+m6BqPW9BZmkOwTIub5L/qC8lxc8oy+bxmCUWNjDbOI2CXSKhR1iUHcDKBYH9Nq0ApLS8mhIkr7ngju1PCpoeAiZeihyCDmUVSTIJN0hQO4hRCumLMzYkmdiqCVPYgzKbRviXPIEe7R/qQV6GOTq34nd3sldAmRvLfecKPfeImHm+z1XMVmexmEw5WVtD2Cd94RmuYpoC2LG8xY8eBqjcNRpTMER1B0a6jyN9ZDhruJpXpd5FiyIrtJ4T4eKUef+R0MFBhe0Hjy2oNFIakHTkCR9zwVX+9hZpyZszmZSyDxcCQ4W2RkmyWs9OOlCg8qBFjg+HG0cPRw7HEHdoaEDw7GFDL8Ey6Y8no9qOCgc+RI9jqDu0FD3S3QQ8yUuabCgOmFXdYpo2xWdiF/7uk7DoDF5U1PkOCsu22RNF6bnmRg22nBhKaMNA+vg3HMXUTv1gRs2qOHAfO3DGg4DQmk4BEQn3LIATg0HcgdPFPBvmbn2hlWg1IlCh9KMu84CzhOFhhp+rbiqS5YcGk+X1PsEkTqWUlUekFUe7NBQ5/TsIYO7Sx/hemx3oZHU7qIhSfqeC66+ztMRkBIXIa1YMGOeq8BqPTBqLkgjB3tg4uiBCd0DQ+Y4KmilF3q6v+oLPaVMY8gXerpPv9DTffKFnu6v8EJPCZOZeyYwLEaPmj3MJt4naNSIH8XRE7fDEdQdGjowcVvI4LEFcjyMHlssEHVsaUEm6T4BokTbOy4cdWKR/EF78JTXDOLtQ8SMYHqGCclP110Im3HMweenvEUy2vquW1yMtq5vGjxJGkoTMoKidJwdyqKRsBFVtw5zq7pb3PBQAtXx6FAyQeRQkiCTdIcAOfU8IizLaK9bKLLXW5RF05cOFq/mKEECqYsvFUiRdx1gp8ZRwQyKhdAsAMncCMEJj+cL3WqwhagxUbYpgHjFJMHo2C9IBNJk8F3xKJJ4z11YpZGtEO68rCggCMddCoHJsQQAYqfM9WsDFYWdBo5qnk92yQwMRyXAowBRnnGIj1Oj2xgxLltguODhcdsJUZxWPmRQf/ny5ct7j7aCb/4U/OGbP3714JF+AYTjyL9j1tenH0Q32g03X5OZxN+E2l1h+M4Cg0sG/j22GrQgk3SXAI3owzSUWx8mYYMXV/j34djyYqOo5aVDWTQSNrKo6zD3ot7iBu/yk4RFzKEGHwdSS5oKpMjml2jBziVNwYwNtmh0f7JAjhEZ2SMy0vcnCXKKMJI/KLJCPka678dglGTbw2zirkkbU7ybGErxLjEGZc+G2CP6SBu36mtshXlW1fceKfEjpUJCMPy7rvq1KnUUmzcZNTZGUORkblEWbYuCqeNjjwIM6g+O4zSW5ltjahEHlFKL6FCacddZwKkW0VCD4x6Rx6NeXgSMGvc9zCbukkD5CiWvwFJ8ewiD/z0cQsgogYk0q3g0jsXkUHiXskLFx5Gs2P4ix2PuaD/GGRP3NkuqFycDWAfHVT21nqyEHWnKxNkUfZ35cZXDiQWiFv8f7cPJj9bh5Ef7cLJL8AevP39kMWVBN4ihVmGJMSi3bYjz+lOwBzdXgIzqESwQ3b8CZJLuEKCB/kX+oGgjUhcl5Db2yAWkyLsOsFNiUTCDnbo4M+Yl1akWiOrUFmSS7hOgUeWMiqM6X/IHtYuLJjtrWBaQficrICntooYk6XsuuPMmpQXRUtgqUGqD1aE0466zgHOD1VBm9x9SSAzCTDcBWWsah1UyH3Rp0WUGLG08zct8yVcwraZwlIJUwRHUHRrqVJD2kMFVeF7mx2OrsImhVmGJMSi3bYhzFRZss7G/0SEy963MFvTazcSI6e6S1guviJav/nwQ7W7UUDG1YyYrAA3fkk9XLmKYDjwaKjgonfdgSvRYBUotHjqUZtx1FlB78ZMx1JB7jhtv9J/vLLVS562wnOpQmkGO3zZ9zmqj3UYPjfYO7eSRo70tpn4ncgS2wMGDlASPnZB6mE3cJoHuZbWoM56fjh3dCBjZsA5mE7dJoPM+oEMML/dFParWkBiDctuGuJdyZA9/uSQVOUlG+tGGkf3YwWyiTwIpKXDbjSR7vEUMmifNk/TQIV6N4kgpoccRVAeUetudASg58jvI8AhLUkptPIghR6HAGJTbNsQ9CpE9GAUDLjswRvwTnZq2Cv4I8wJaLf10GO5m+oMF1Vd5PIgcPFcheuxcZYGoc1ULMkl3CJDzvCT5g9H2EHMYsKqKq5pllBHUyngq2h6BH+A+GC6qvqk9cDTo4B2LgI+pZW0UpZbtUBbtgILJVyjK/EdIfVJA9OQ2bn9T68ZvRhn87+kAQLwzJhpqq8UcpXaB4R0CQAeUbeoYjNwhOphNPCSBI120PVTIPrtaCNZUVcwgRUZxvD+EJLtzsG6W1E0B6R+iOKxXQIZ5WfKwtkfdAWF7S6BWGpsHVNeTsJH7Px3mvv9rceMvMGpFYaOcr2lKTkizp5MhPdkNJ+QnzWAYr+C1UGMQOlYb8jOWhGAEThm4jQMpTaEKpMi7DrBTU6hgBj+TwI19JhtFfaYOZdG2KJjzM7WAQT0gP2VgCrGCnxWNpPSAGpKk77ng6st4LtDglxDAsS9ho6gv0aEs2hYFc36JFjC4nQgQtduOwajtpIfZxPsk0F7V6ArH7nI74OCpgzdlvoqjEYWjTh0KjqDu0FDnUaKHmC+hKb54mcX8MHhGDHWFc89dxKn21mHDPSmhoz1J4Mie7HEEdYeGunuygwzPWjZP+Gg0AhtFztoWZdFI2MhursPcu3mLGzz4RCVnlIkpCTJJdwiQ80wj+YMXcFFeVwdZXo/aFpFAav9VgRR51wF27r8KZrhj87qixIhhENn7EmSS7hAgd+8L/qB5dDRLWLUIKp5gBjeRjuWujRibFDaKmhQdyqI9oGBCCSOSZ/d/kzWOzB8d5p4/LW5wrYs4LyrOqQuhURy11ik4grpDQ51rXQ8ZnnYSRm3140By2ilAivzQAaa0brtDWMrcxsZ0sRuLvKpXxS44ix6vgu1uN8gvTsgdPoU7GHUTopGUvKshSTr5tQ4cjhh7g2BKNlNBg/ZGLXAiYmgMGgS5sJRBkIF1cMg2U99hHDg0CxxfYUK/3RvMgiGTEgVjfgF95xD39Bg1vhZ5N41nhfGYdtrEUNppiTEot22IUzst2IOq9GhaUhdNgxiysQJjUG7bEHdjkW02VnMsDkvOal0BEeZpyiDvz9gYJIHUGFSBFHnXAXaOKwUzuK6F+YKX3GGsvAKSWtc0JEl/5IKPrmsWmFrXVNDg2VkCx87OBIw6O/cwm7hNAp1XcB1i8PQT5vMlGapnBEUJeh3Kom1RMKfOogUMijKwllULnlBGZONAegL1QIq86wAPTKAOM7iWhUlMBSMfxFBrmcQYFAIyPKAXrJ6PR28iYOSA7mA2cZsEugd0izCbf8NEdWnpzaakPOGkrnQcSI4YBUiRdx1g94jpMYNnzmmS59QXGgZRZ84WZJLuECDnmVPyBxeaaVxnnNK5jaCohaZDWbQtCuZcaFrA4Ox0qAB3CIxBuW1D1KZo6cOmrMvxhpfutx1M2WmuspCosHKVlS33dXYM+etW2LxpJLV5a0iSvueCO/djFTRoO9YDKZ3eKlDKzEyH0ozHzgKUSHJ3GE3dk2qoFTuBEkxWgQ53wsTVCRPHa01Weq2xNFZTFoeLho3GWlJwBHWHhjp1Kz1kcIFjrsw/90iURduiYM6lizmy/xhNCuuYys44gqLW3A5l0bYo2EDDBWBwf2NlyEcjFlogan9rQSbpDgFy7m+SPyg2sYKXdUN57YzBKLGph9nEbRLoFJs6xHCPz1aIEWmByB6fWQs/ku4QIHePz8iVXpX0jo6qIgG//jzinr+uc1CzHUybWa0XUQMWbGqcLJgXjTAhqczqwCNiGYe88vxdjQHuD9JBP1/ysowjwGxpGLCjw4xSs5K/CqqQJVpXmADYrzc0vtAeBClP8/JMb5joH+wanYFdJoIQtJWlrDg6arKUQSZdNk951gVFQ1b/t0aGcAHi37aiJA97rTX88PxLGgvCLVzVKPMyPwnqvO1xfBOUVZqqzbJzRefxV0GZrlu0Iq8gg+7nGqPkYVOW4DYps+723g8OgOffG6shQ9ijMRh8PJG01/MfrAKGrHeef38laJCsVGVZBT+tWGW5YpVZALNgJShoz1d4OiZN7kNiGLijI0yxHZyUaLPPa7YSEKKK7K4AdLSuxZScRVjXzjjuthOCQ9bdmnb0xtk4hp1uDWGOOe/c8khAFC8H2xkOF2dR5OQXJS9YyR1D4+hIUqYlZ8dRfpJ5/hMXlKY7ewejuDRFxPrLXBoza5KkT3RGY3DK3nJBwuT/Z+8roNs42naXGRyynTiJHbaDlmQOtE3KSdo0bZqyupZW9tqiaCVD2qbMzAwpMzMzMzNTytymTZv7z+xK2l3trtV+37n33HvbPW407/MMz7zDM6qS2cKGGmcuwprer3ipGRdKfcPCoV0ZitHsRfAJQH3hLgQXW5aaMXkoFijzQW+SF+LjuyUfh2IZOekTxmJeTnMlRQecGn3TIXlDEKYP6QDQilp0wKns3KimVgx5EL0yGDjunirAjiV7Jw1BArk7FCeaSTnUhY0D1d4EXxzoqzpfRlTr8/ciMoQDSrRwcWspoVQnNXpyPQDv1LYU5yFIRmn2Tu5iYR7vyYGayS0pbAHxIRiBcEtsawCG23DoaaVdpCTDercWy+a7fspAvpMsGpJ4qiusq/n+NzBFlHi8U4n0AsNOar7H19sXjqjxuA5fyqx0yjIq6DC1F8VKpFuFt3U6lbAbWGgF3G0aGqHFj+Ljtp81a7dwkh/RVAANpRzXiBVyzs601Pjx3jio7GNcYViH3V0udlv8cWVgrBcOqn+NFxjV+jzDFPG2pkSjU92w0qruSiuVucbOUqW8caNGuaZ7sUK5FAKjlBQqUn3DaDcOrHtzHYhrL8QVrW9o87XrA85wwdw9Kwx5HdxSjeRGsGkkNwJMwMmuuCMFpzlIYOdYOKP0e3QCfHhDEGYN6YBVAzhT0p2dDPf21TcEh+QWDr3ksuHecCaVDf1NK1p0QHdqr1I7pmZyFlxIdCSns4jZOT6gU+3ZLcIxMJwkKK3Fpcy4Fi2H1h1R6ht6fWmRVCINnrBKTq/Ts9GOjj64S3Je0c7s2bMXdHSEw3CVMaKGYaOmx1P94bSS7XYQnQXX7peZygvdSYn0UMlYZLiWArsTJSXHWSuNXZeW1sRZK60E0Jw49bOJw/ZknCcGGgRna1FEo1qft7MRH4tKNOqmANwaBbfi75rE7inko9gsBHfFZiFA9eBs/Qwcqv1FJZAyhOp3MtxUndONIQil5UrxaArySKF77WLHAyitJEppGzIEyda99iIZGtmT42hPnP3OqF+/M2rtdzo7lVGfTqUFK1WI7unsVqz8+4FR/35g1LsfGB2iHxgdoh8Y9esHRn36gVHvfmDUpx8YLa8fGHXpB0ZL+4HRIfqB0SH6gVF7P7BUKZqlLhFX6hs8Udi4uRTtIfuQ0UIf0hkwRxvurFyuHRmnerWR0hm1z9hWqjuLsWsL1AdaoOnlMUGXpSxHe8t21OgHObPT2TA71HvpPLUvAcwp1/gQat0xOB8NHPfDgdtjvPHJJVA8Zax8WX7u5Un6r3R9KkuchwqmNEWKysUbU/IX+NsxoFSq3ICo1ufqf8SdrkSjE53yUiUy3kmxm0tc6O0zlhSLv/b0ovxXUrwk+Syayx0ztFZJQfLsn1hXsca5Qb1hPZvKKF2lhdtfVXV0xLRkFMQsO8qJWGe9ilKjNsOlU+ikOczSUmbt607pxWbaJi0MyQpScPV5KRdICzfbO7jGb2P1d4w3Y6IDiuYSiUG77RofSkMBg5XeGaWCsDCFlBc6I1QQFroOdib8aYSn2gs388UoN+DCeLjabEY+f7VIB3iAKgFypeBTAUrCqgzuagAvbRWW2S24eYdDTQmQf8jLzdH8a17gikJPu1oyXUikAqbp+cfA+sJdq8CLIBlN6QSJVFXKhE30KIccbAHo7VtpSLsySiKhZMLZjNbVpWZADQXXfbpVbUAdomovqG/YoRx3w+FcEuSJpsS11Sp8byEVUcDBvkgqPTgPcqAM+FdrdzGjwhs8IkoyqgElkd/LkcfTSkaHLz2Af8ESfE5NRvKDHndSJhfP6xpXQpUdg6UJ7C9w2FGifUoyooIZgEhvtQOLRNR0NhzpztcdqJOURDquRo0uSFjLdlcUMdvmCSAo3Bekg0iNdwUKV5q429Oy3SOKQCQ7EE5lu9UMZ8jAlROmhoulMgm4KRluFNG7lXR+h4dxDhM+QFV4NsIsYFYlkwsFh1ulWRXobJvIUMiVVhGsvLlQsFAjLGIw05NL6kpMtVkpbvYwM0nVI0paDfd3a1lVTysRVTDl8C5QszYVZxpg98Ot3ZzpwXQVK15kr2YSMMtqJvNEs2REVVhWtNWqOWYxe3/hqBpTcvFs2LbVt9A1NDpZoNOgK32GsvemwM1SgDLOQUlnUhFV182+9QQHmsplQSc1o+qpeJ8azqT6nfaLDDXT54hAPmFNoxOE5dXcdZYfVRRAdSCbUSJZ24U+ZkGGe+thx7iww94shPmONdhXZVYKGC1YNVLJ/G0shgxUjYlWAVROmY4OIynyUarzocB9XON9CEo0Os4NNvaM6eqqWm9UXZVT4hPccBibHFjdLW7zKmUkwzldLY7X3AhG5umFSgxKq5qMQmXoEIHUMtWFElXSWTVje7xqrB2KpzJKUaVWeYBucuDPDLscvncDwWRYS4J96fBqT9sYr5RbwqwsjK6gkoM9Bz2bqezRU8mwHulWwVs/qbxyN8QwmVQ9q0ZBRHOqPrtHS/YoHR3QFM4lo2pMSwJt39GxpkRW31DnTQeBqG+o9yYAv0GBzmpJvb5hsjcRPJDUp8TVZHasjZTNpeNq0asaO5gCkYcPDanpzEgnBmJfaRfm3RnjFKfSaga08/Pne0IT5lc7oWQqCUt4iS8g43pVF7EODjM4xfZUqnHCim5Gs75htAsG4l7fMMkFSWWiakaNhlOdoGdS31ASfkUHt6i7JIeih2PxlJJ197EzlYq7W1IyGWWwvmGKDTLzKOs0T/Zg5ZLaqpwKLsTurm8Y50Ey8tHLI3uKTvBgFQvdRA+GJenrvClGDvgQjASz1xMjUyyVLi9wxqpItJsne7B8kq9IMpLPywlNh9aN7vt4DxLsrquDXoH1y4Iiq5gFoz0YiiNzLEgxc6Z7U5yVoM6bamSTvf6BKl5MsEmumD2qta6cYkTrXHFLZKbaCL39SqbLUkxMszMsBZot+8e6c4zI1LmDxZDaMw1s93a6P8aNYbg+0Q3ySymTYkkIe/GM5ZIRSzoYRmfJypOspomuDFs8alwpbm1OHjM0fK0rVkzB8a54QWXYcxpqXGsMDbMzpws0m9GD41MaChwjmuPdwXwTN9kd9qvlBZIlS2s9GUbls3sDZJYEMYzOopUn+WRonuJWifOYPSZ1rhxLROyOwHZviPQucIxQ1LqD6ZzeDTusHh7YVHOdO6dY/qrdCYqjahcBr5yyMoyc8vC72AmYaRJySSUzGFYH0hlV1zVwIHeNU1QsfaXkPk3XsrWesL0fUIqrA2oklzXeasxXN6NTGdeyakaJd3SssZmL2eag2dWaA7R6U5WngIG7UaJg1Rfz8hTomeabrKyqZ+2p45AUG/ESKkyb8V6ovY0vga1BbiyQMqW5VSos5r6bBRiqCT4EI2DTfBjWsK00eWaPKq1ksvaZiyI+xMyFnVhvd7dYHOyCYvI7iXZt4kStUZho5/SktGQ4mTIGlio4PqRGx9goHR25dFrNRBTdMljJQ1ktG1cNaKQDAv+mR7kIk11OV+Kp/rwHNQ4ooqS1LJwBrW+oKmBKFgbVUeoscmuM82NMPQ0nyWzlqURWVDYudOhbnTdu5EJe2ehxLaI6vHOIisqmlGxTNqWwXdmU4m7KRje3XpmJtMZmtqS9nQYDMtYdsysiB+iaCcYZPnuqOGWWTCil2zOhFDeCNNWbYA1WvsZkcsmslgCrWQqY7Q1bKrhe5eSYDuQVVUbNdmdS/cmwOgDmr404lQrrG2b5WCiV5YtRRtF0NWp33CGqb2jwJDsl+YmAdCYFpmby6TXWKbam0vA8qCq9YT2Vy0TUvIfGGoDVQ6dkoo1ZXHOwFJWgKyUBZuUzlqwLK5muHOBb5m8cVpRIJlV0d4IrSYsVGe6Bi6UyRUqNK0XJdOlFdejAkoP1DZVuULGO5cWaXvRpbCmmRcHVdDFNzQwrAescEnUgDYp60cooV0K1VWpM2xkTevlGyByHFhshu6DYCDmJ9kbIibo1QibHrRGaa1IcYmtJ84TGFeym0qXaKq+KSspXR8eaEllRFbnQbarIBberIheCNU3ynTBHGQaBskuKGVBCtTWHJai9E1YCWwOT7xDF1QF77XYIKq080J00Fl5G2cXwn/oGh1TTw/2pTLS6RApeU+xSMwtNoFcdBLxC7bfnmA9aVIu+TsBEm14O00jAxnKo1sTMZ4gZL2eFmewFW90okGK2omE1FtWRnQTjV+MKGQGY4IpZfc+X8aJuAX4XDMWpWSvBPra0IlanR5i4sR8uCfZqFSLr0hgb5zl1rU/Na0s4kwHUsTlgjWVSRaXtBEEvvCKPAdUHhj8FslXtO/o9Dsze73GA1ugV7MPpBY8BnAO02s/3AmJaPKvafFnjFBU7k6VkW2eyFLZ3Jktxa4gcrnjqQxfcrg9dCFZ/8uOJ/KotHNzniypY19SScG7bEYkGH4audSVBAvd3g+WEaT5Mt64ruDkRVHNrHpTIisNRF7oRwnx/MqKk9XAWjjahZza5caUFvPhJtsq71EKfBZqNdduMquipJKgkaiyWyhTaeEABWrkwk1JfAOJxe0RsgmJ/0EmEWTzOA7R3AJyoW2MHOTZ97pAUG7sSqq2xK0HturUEdtPPcGdDaXymesH24jTZi+ZWeTrjSrLXJbz59rQTbJqDa/lqVs0Ulkk7tdIpkRJZUee60G1V1AV3RLmU4DZ6MmbczPlGR69sqo1T7FTazMXy5qDZ9aQDtAZF1lYFwnoqA26uiKfVzCQtmc3vowL7psA+mHBY1yNKMjavL6VFp09fMNOVo+iw7sXmxVPJrrpoKtcZB1M0Q5C1ZHZmHbRRLrng8lR/MuSpUxewBdoI8Auup0OdCJxbUKElusLZVCqeP1wrFQWRTCotd8O74buVYHNLuFsdELqVZDQOBllRTRnfBZdNwTK+cbGc3SxDY0bpNwcNU6E5oXcZ22Ayqm7asIrqG4IFGbyjRNWBFreT7UB9Q0WXsfrSmYsZW5qqoMAIK9jJoWaM7XCj7fKoWkCMuCiZzLzivJwxFwfD7oA7FV2LWODKAgzb5Ly4oqsrFwv39nV0mD9qnYJ5uSRQB2q0Tof78bzx+BC4NgQeccfzaLcC8KpSvDuVyS6oKZHDMgv+t2BUCQYKVqlLRspUl8iNgrqgsgQAk/QLlpgm+3ypKZxppJrPfKk9t0ZCe6D0mNvvwBa74QVhMn/PlWgR9faNhiawawtugVUzhbPrXFdXIh4e0NR4biT82a92goujdD0B7nZKzrYJu6HduNYJougmD5VDNy+ASmtpFfR7Z3raASc10vCGqQJ5ui8Z6uw8dZYfVc8lwCY0vUy2mRrlsyOpZF+B7Z2IgA03xGUzWpmOp2JZeDtBeWx4F5clmvVDsctKaHue+IYA3JSVTGUSBXaDPztddDfgy0zohruJXLxgY4avDTWtKsUINvpxV+WUZFZbrYZXtZWXdGklWp7LILhg92yfGilY8K41Fgta1GZnTpl28vyWMvnmyLOsPMhbiyl6trw80BLBSCpeXpJ2xXPlFbEuZyFv8mUrYMYsqsazSjhpKfAeGs2wZNnYDDIho0ZzEbW8vLBYLSu/LfzOeG95yRrJJYBCKytZI+nBMh1NJfuC0fKUmMmN9pftdEQps8iYPfGyWgsw3wF6wnlysBxyQs10qeWFRcl0WVWvPzcatdY/W+uaV4q2jEoovfkTNGE4CurKpHLgDEg2MzjGSrQXxikeEBiFp8BNj2B7p14FWaDsRlPZcHZVMNwIdNtipzxgyitt8lVthrjRIW4JL3ZjN3uJA0AcKBG7ut3k7kiTuyNN7o6E3B0JeoldHTHTpNGeVsm+WLrJRZ4YyMurbXJtVVN4QIfelgLJOLQx2gGEwgOmlaoSxJA7bQQLNpyeBMMeTgXD7vKApzwB5cNs8s5YoMVMNyUOj97AUg5OdQpQbPbkhhsGWKdTadh9laAIDrrg+K1oBGiNYewGHdc02AJkbPSH+75HOLGk2m9UNMstpuBCxwpDaGxaBywj8Hq/BloZuE2eMSS5ThPK97PUgawRItA7gscH+IIxEBXhbxBTEHTONOWSUdn8mVZBM5nVxKJZHciyBZNpRdVVMzaFrkekO5fsNayl0lm4n10wTTBhDJtJ0PIZniXVfjPekmk2piJ0I2qJXNyImqYXPIkafhpDZGNIqprR7VYyUb1f07srikatK5HSTDvGzd/gsHU4p0UnWWTgjEsOHheJpJJRkNFGDhk5A8cuIHOzGUXL6mJBCOJkpEtMi5tBNWMAE9eIRVTrM9yJAHWXDgXBJnMtFBxVIgT/GqUNdsYDRvPUPdYUGWGMpTL9SiYK+9+xUNCoTsbpjzxkLKQbidIZB2MzbbVaaxjNMw35JmAwGenOpMA60GRXvDhsUwC3zo2UUbsKyVHvRzCuJwtHUrlkduLQxCoPSrWbHHg+wQ2w5bCrVVBOp7oBZnj1XDqdAusZqbRr9Jw0cOmxa2qaROOofiqtTxqCBOI0ZQiOcdJr+hCsqKpHMhpcBhyK2pmLxdQMLPB+kVD7QClPqv1+ATRIIH1dS59RaqGyGe2Juya5JZCFlJpZDhHoR1AbZpdDhsoX0meVR9e6kqDyDxkSw2FD4pp+JrlY/fxSIaEmikQ/54qTMK4lz8ICU4muVcLkgCw1f7uqBJNmnBp3JViOW9mLGTiOFIUxV8EBq/y0T60LyTym5qLeDNyYTIqk0lq+O2nHQSym2eQZtUvTs5lBMKMJfqmZPDTJgwfnUE3xbA+Oq7i+YXen3Og5O2fd8pwhZt3sxGE2t0sVCax0LrlZ682CmTnOjoNjcJY2ZKIL6mhBXChdDsoYdwqIRGUpBAI/uVRcqrunDk0CmnuKJ828kQECLtFwavcJvhQQm0m+DEOzz/LlgIsHrJql3pdtaQX8iRYXF3oSi4dZh2BUexGaSgEfR00o6WMpL42kkjGt679SkVyKg1WTg331KT3rUrbcmqjpQ9PyDdTMoanF5mlGOWSzcVriz/XJABfaEBGytnMuhb2klRvvyYHdfO9UtjWBLtrApMEa7NYCWkldZThk0ZguFSSvMIdMSpPhHW2oc+19I0MLDbp00IwqbuzAsOSCvSkAIbf7Z3TSLFp8tAucUSOpTLTSBUmq/VUuYuDPWJs8qvZZNVBlCQjHBVNKxIUkTyUMfZfOZuwuR8yRCrj3JKPGal3B4ph7vCueNBmOXnkeVjrBzFu+NzKzhAMu5Y/0utb6xnLI1qrSMISFYlGfPgTTUuBLU8U+2hrphteVCI3hFLib07hFwI9gLJuVpqeVYozLSrPENmybUAobrWwETFqC/Q7jXBkxVcnmMqo+qgQFYS8NWGmnYcqQnNLRnoVl7TKURsLZYyhNzJLuwGw/Crw4wsx6HRaraX50S2X05VmKaWm5N3lulbS0GHsV+NLqbGGWpkpJNSjNJbd2wdOhosYvLe+OQVFp+ltjns46qn5pESttQDyDBdY9jGCVlm5r+2D3JF/zdVvvvdaVU9QO1V64vf9pZBq4acdctTfiDeqAcSNZuWxjig6uOCRhL4zJC1rBj46OSDoHBmFAmYGzXnB0YMy/zesETxrB2WejJ2ewNv3b9hwzamV73BJe/I88Ltj7px43/0OPm/9Tj5v+ocdN/7nH/yyPm/7TPA7+wxgH/8MYg7WYf+Jx0d4/9Bis6fwTj4v2HB4HXBywNlBQUXZ0WNpat6C62LBMFxghobrUbKQ/OtxoJaMaeAsj0wu2ug/vUpNwYx3suIXBFa5Sl5pIKE35i17krs5kDFyrBHSpouuGWYnk78IZGdOLy0NgOxLQ6nz+PjEtoY40f6czqUQa9JMzSrJ3sim03FWWUfV0Kqmr4ZSigZRSshWxVEZVwG1MuWQENMJULJENx9IT4Kat/C7DZC5hdGWAML+fy7wUzLi+x9hxryWTama0mujvSue2T65MZXo3TyXVRSmwuzOrRqvyyIpkREmDTlF0i0wmlRmfly8HF8vp2c1hc16wVuuANzPuGirgBQ+XKunNwBCigNTkEcPFJSk9W8CqDWwR7B7uCFehl6aiubg63AoYFm2ihbAc1KgJo+OiJo276WBPIK4ltKw+tgQzdhvAZ6Wk6GByESgIfT09mqYJBaPWo/EWg1z8rfVoPT2SzWy1p/UMsxi0np6eHq3CIdFsFCiRHRK7WeuptpuL/410A0a4CIeXyoaViCqcEkc4NMluthtjos1oTRWbQ7FYzAbGrIaoJd2teRDjir/Zws9CAHo0WwYCo1g02CGLuz2axhV/F9ztKdgFmaFZTRaXNGsp0bSeEcXfRsZb423KhtnN1jQ0JHYLmtVvzWEdZoENt4ZN66mwGKBnkk1gs6r1jLSaYFit5dIUjrGbC8QeTav2ghxu2EOh9YyyGQ1LMa3CKXUKtGEOQcwRWK3HwdB6tHEOCUzhWEkVKdSQnoklIqclbawbJf9fjQ84xhsb7QlVeyGV7kCVqzimjXKVuzoS00a6iUe4CEtT0CUAMfhfKTXmzC8XP2JuslhpuD38iMUqnCJHoXEWvJijuDqMUVsdsjsWi8Uku9laO20OxeyFN+awGovFRJvR6pDNELXoI2tUYrC8ilaB1V4sZvE+qlk1pKZFueLvojhmcQ24LlhNVkNRcWuxgoItOhTTeoTib4s7Mc2i8y1ORq2hi1r0d1SrhfeTWm97z1/wms2oSkIXIN4dCSdUJVkJDcaKs3GlKbgrUx/lFINZKb2EbFzCOcnYNu/eNTO31AtWDh2NR+IpXa2MarGYsWmno6P4e4zlLIR5Q69x/3EyOzKqFrbVwKd7wVavUmEg3DjCIQTj2xJZS3hxiazZVRZwkZW61+Rit8nFbpOL3ZCL3aCrrNRuoDQR4K42pxBuaRvlEBr72dykyXhliRTuZHO6C7exlXLhHrZSh8EGtlIXgmEXYcBdmKiPquCeX+OGbHiPqXF1Rzqla/CCT3jPdzgYrXEhgsLZp6n9f5k7K9NgiTmta3HwGxa3mXUWSM8qmawboBoH3Jxi83CXq1PmNdVuWKQ7pbkjYL971oiWC6q4hwKcYXNlD+bFw4rnecDZmQVTGwARDEUKN6Sa18HC85dgVDXFk6CDKb5UuHMwq+qzPFnpTKpTDxsrj/mhZpcv2+XNhyJ/iBVLO3GEmQrZjKbm7w6tzssKiyC68cJAPsn0tBrJxZWs1qcWNzICRTrVhaAPJrPd4Qy4rDx/P/I0FxqcXjSOjHV0wIvq6xsahuIV3u9ZMDTTD5/kBRsTtXBHZpUHZ6mbPJGOh5NgViCswyOT5onioWj1DTPKcy2aUWLZbcvjlsPayp+USEWHjEEiFa1vqC/DHRj2zcsgDu1fGY50ql1a0rUgOYjGJfWLh2Aq6XDv0EkBWPUN08tyCybH1mVRyyCV5ydMlCGKmkk1kkXx51oeZrFopr/10MEQATd9KCex8o+QDE2a5cWB3hQqkHn1u2d62dn+VdPOLYflmTAGKZFNF0LoWR8sVP/aZyEOSSnHN//aZyEaxWyOP1NVuuJqyHId2RAZmOebyVOm6/l3LNUhMjzPLyfD89xyWGV6C5N2ZnlcI3WHSK0oPF1TbnHPs8uJfZ5bDqtMb2HsQx5cbwVd3zDRBSnua4BXk+7lQnHbJFakDd3lshCrXZyH0RntAhg5V+h4GbfvG8+CFR6bUGPFmm8llMrqG8bbheDogJrJgqP28AKJzTzhXNJcfFGj+fdsXIVTPF2whrfBk2UuhpgrKvUNjZ5MD2Cat4VuNdIbVsFKhl7f4M0Lw6QYOkJhS4y8I5R3B/TswVs7Pu6B0YmxQqPP8mZ1qUnwWAB43ACMDoCbM7zZxryEeR8b4PrEG6ywpzNgaUTrU2vzPPhOj7GeZq7Jg+6+7oODFTJ9jAtuvqYw0QEZ/8Ixm/lUUDHVTUrxIpzOXBTOo6QyEXWEgwXf43DIutSskwb2UzhloEviCLLR0MRTXVpWz9fNjJpIZQ2NAQcfyezYApIPoVmE4SETL7CQjuNKGGYE4SbGUsdNFFj1BEEylPpsgoXmzdM6SJ42LzCSHShUPTfQMz6ReCrpHVt43dF4T9SmBc3VU1id0ynNuLEH3CMb9CZ4IXkvwSyAOakGawy850zpavCBzbVUsxhM8mPCE9ypITjGJMgEPw6ssrU+DFDB/aKUUWNTfWC4RmxcZ+jnC1j2nuiDG0dxGvwCokSjY0tgyxMp43zAGfN3sc7d6NlwMhVVXdvmtNpVXttsEsc6HFYyahJcVZZLpO3xsYBAa4IAVFthAwIPTtU3VJUCxp00pXJwQKSmVFy40c7FCgjb2FIx1OUw4TbNg8bBUmvvAvapipXDg9DkiftYne1AgEo1Ln52lTf+PXp9Q7UNsJSc8Q7AZixmomXkD5SHMUdXdNYBF/uNpfMTBYmDoqSdFCW9wilwLbXJrqFuGbcTR9tcNd5uMh4RrXJBQBmrdpHDvM6XJDgDl0/1bCoMX4/Kt5nG7lJjTnCYKYunusIJRQPXtlskcFJZzXSCCWhwTjYF9EKNhZDfgp7fK53v0hdvwSokouViLPudS3/TTqR8O/abpv6GncKFRg1l2QH3Mc0oi2ns6SkvJEUJPJtiIdR5smZZWZbfcFjs4NY3DLcxoHuVNlHhbs42mzhfWeuKiWV2fOeBvuNMKDe8qHK1OGF+tU2uFd+UKAEKj/I4gWQO3ttrXs/qYtMg1DdUlgLgRcfRTjG4D0tVks5Aa4XnKkbY5XC2faRNBi85dSasmlF01c5TE+nsoDPIFsMYL6C+we4QHHk6QwZyzClTdFB/7AGD0VpmEbmqM7O4DK3OTGK+h+I2gW+RVVlFlon6vEaKaVmHpPiAZD55QOctk4rnF1+AahxtgcDpf/gEMnwIe3IeAe8qgvs9QXOXn9zMv7A4yUYCayf5JZ3iZr4JpRzj0u4CY5qTYVsIK/JmlvKUeLyQWnbxCqfUNbfMi+aGzi2TOMvmqpkKev7IQ1hNgmdkwtluLdkLXohwZ4M8HO8OwbGDktY9bILBSo07BMcUM9yw/BhaKw4J4HMK5XHdaVEtA4bYxr2twLUJQ9KmuzEcmWdKbdEA3byEltTA8b9ECHQj0nDqBNQBRc8GSrgmAdzJY+wfAIVb0ZJwC0E8Z09Aq42Ekq7zwvLeTXMSzE2zTt5UJ6840AIlFLwMlkqryTJo8AC/J03PKuBajqhR6WD1avQkpwez3XBf7CAopPmaopdEumhBzSRyWbXZk2BMuBT9zr+L2asO6u3l28rv8wVnM3rVwdDfsBlXstC3YTY78IJPh8TaQbbIbLFP6F0l6mmSgxAG21SKm7qBSd/VjfNf0Tjb/RddXlDfMKXEORVuD1YzemGJv76h1o+lRKNNnrg9hW3QXp7IfyWhFKfz5lyFy/tG/9CHFWX44L8MCFWlYy1wosPVQjYUS2ApBR7dsuze1505BmY/ktH8QdpkdicH/l9JEFsrld/YPwDnE23tm3k3uVLcv5LvWRnvD8OzWhU2kRKNTigIdNUyOLMMu/MLAUp3KhxJZUDPurhwbBXm58ocjw1b1g1KkD29ANeUU6JlppxJrIzEtXThrWXz6ZLwQA0UG8PRJGwOU2AbEbzVbo4FA123wpRtXOlTwrlueOkH6MBF4ZEMPejBByOATLIvHo52ZxxWal2swFs8uo3kr3HBYYc0kh0Y44LBe1xDwXEekPmMlgcaCwXHe0BKBg5k/OBYKDjZBS4RsVACIrHc+JVQutRwrs2RywVoqFy2EWssTsZCQdsNzwZmnOUdTOWyub54YS5xtBVTdCVYQGotSH+3pqfB0wPJSAG3uqpn1XTI4uoYK6Z1xbW0q7VV/WrSam2yE8tmwdxXL/RWV8PwsNMkP1JG1YNJNevLMT1r9OOApaWksc0KvCgQBpu1prlZ6FLhMDCqGr9AQkwvg5fOqOC2snKoZnAbfKnBfqUP5Dn4HSiDCVan4B1sMElD5dhQcrpi3IkGr0TzD7phxwx6nSfVpbhAguJZXIKW4jLbgqVTkV41a83CbCwRjiuDYFnKOAs32ZduujnJnaQqSRW8TJAEkfPnGJkwy5cDb5bLZpSknk7pasAraCbbDNoEV5I1Ha2JldbAob1iYo21YkpG6VUtTo+zgdFoXE1FiusNEy1oEqzTZcAkVzBsyQprFifADRBdcS2RsKxZzLQSUp3gDJ+a7WvOd7MLIngJ6Rx/smasrMJWSIvmlPgMf74a7VIL3FpfLpjHtuCFsaBrMgI4kk70uaZ/QkukCgkUTiTGeGFOLxOpsJKLailXFQ1bYNd6AyeSm1yhXi2hWbyrcUC9wWbX6OVbb9dS0p1LDuYUK2otJV0ZJQmOAuhpVQV7oE1KoJTSBDcFpPJlGOwYBh0FRdfVRGd8cNKQNuzp0xVPNLnnhzF47nONqYHlfEF3lWSAimsSqQNKKqk2hZtdbUZTWd1ayWodWCgJ1sMVd1xV07qq9lrt17njQdeggV03qYy1fo6xoV198UQBGlWE8rnUp2VHlkoTiQpDCO7EMrpxRp8HzCUNh7+MVW7z1wowJ10XSSX1/JDGmLHOqF3qgGPCGnSEjMFy4YFkcLcVOC08r+gMYC77R65Cl8LGkV6Hg4v+iYMON0ZElGQE9LRT4EmvCByeDDdlSsTYCZUd0EU4xurXst3AOAqast0qmHNNanp3OKvovaOh1LRrgOAai0h2oMZEjBUfOzYyosThWMaYRTCOvuwYCfabR3f0eMo5ci1gQ3VEbcQqoyxkla4usHmpsMxcYciLpwuGmYVGS8LrtrRkVjQk5halasMU1dNKphceJk/1hcGlvJUmAHesBc17VlOZ4XYxaGJHmYeH8nM7Rkgmg+UEI6owC8Fd9BHzwYxwuD8DR02TiqTCCuj8eeFworMY1flFjrVE9MOD7FnLEx26qmTyPhQG4wq0nYynuhNKMmnuEVA6tXBfKBwIhhtBTyKraPH8c5TzilTDXR1cKW480Ak1tRJ3ULrK9sE4w64MhKPGbL+bd2btA7u8HFj6n/lTKKh/28MW6CFs8VzGZL3qYBjcYpjJON6ICZRrDT431JSLl+8RXD6cWdccCAKP5gxlzfH4jT/fFpF4eXz7YukoyLesTcIHZqZAKXzixXjdxXhByGF3rAcLOjHTDhY0hPGklCOW5ZLjf4es/R1ypAyyPfZDkW1vCE0eggwfFKr3JxVfF5roTwRL20N4aKxpT/EnmScmJ/mzYG6P7lQ0sEkkkVJDYdt4cLqSy6YKD/fCpYqkoTRBkTS3VRr4WCsVzjlm1Px5S73GCpoNSX7qcbIVK+UZpnovkpJU4oOr1cK6zxgbCNeW8lCzqz3jtBa8CSWSLa4iGJec6PUNTWXYMmdQi5bmlmGp8FoqrLpFu61/x66ugv5YNpWpb3BPFg978ABawctAeVb1oo2ZPjbM69LBg6MGY5YP2Wo0lpLm/R12Ye+ouZ6+yT+xDBVoEk4Hh/6B/XL8tHgBR+nxuGpGt77B1c/Clk7wQqBTVt/QPoSdfAXMLyOby8rR+oa2Mm0W95TqkRR4e9C1TPtaBG8lgu58fcMcN7vmsoIlgqbEI0kKfHOLNrxbT4mDnl06rUZhkcyvoJhrJmoYPCerKnrW0UmrVdJp20vyNnN9wwglloUrH3DGXc/FYtrAyLDl+pts3FiEr7IJ4QFQKB/rIod9dvAChpsldUDLjnGRRzKK3q1G7VbURDpjPNA1OlxyJ09G1bOpjFpVisDoT7DKMzlQb8JQ4Wl5P21uGocAEooW70wNDA+H+xU9YWwhMXa1DTNFxhglC96aC4f1bFRLGdcGCHkTGLgWDMCbAg+e4q8Kh9NmlHU1Hiv0falwOJFQ0tVhe3SiqVwWOhkKhyMDA0qn1hcAGd+X0Mwxn3GDMFygMfrp4U4VjG2ievZv2FE6U2Bbp55dUIadbkUHT5kkOrWuXCqnh9O5zrgWgatPQbt1vYxQlm+lEMj5Q1vxCeN0u22437twFbOx0gUuFQWjqtl2aiyXjCqgYVHirvQ5dvqQUS+TX4h3xxB8n0jXD2G1EAdH6sArn1XQ5sN7GOHYPmaOfOrdqbD+24hjITHcFU91KnFj01s4ClZ629taW7zB5paQN9jU0uoNhpqaPMG2QKDZB2wMeoKt7U3t3mBri3dUWoPN3qFtbWzyttnSGvIBgwFvsLmt3dvP5raQd9o2t/oEqLnZz9nmoA8YDHinbVNzkx8Y9A5tU2NLc40XGGpp9LQYamrydjXY2ugdk2CwzbsIBRtbvcFAWygwzhNsCrS3eKPBxmYfNNDW3u6HNrb6oK2NPnYb2/3sNjb5haox5BeqxlB7yA9t87XbFvRDW3zttvjkQmOo2S++oWbfMDf5uhxq8kODvikZbPRBg+1+/gbb/MIc9E2NoG9qBJv9ciHY1OaHhpp9Ud/4BnxdbvRLyYBvmQy0+4Uq4JuSgVa/lAy0+KVkoNmvbASa/NI5EPJ1OeQb5qAv6pvOAf90bvQLc2O7n8uNbX6p0djqa7fV126Lb6h8S2xjk6/LTY3jPdDZ7eHWYEvjGE+4xRsKekMBb6hxtCfkaamt2Rtq8oZC3pB3AFu9g9Ha6g15h7DVOxitgTpPqBE0u37h9E7I1lovpAW0iy3eYW3xjnxLm7erreHWYJuPVZ8AtYSDrcEmr37S7JYW71LW0uLtbDMIUZu3s80+ofVJHu/C1uKdyy1B73AGQDi961hLwDOTvSPfDOp0W7MfHmpq9o5Kc7u3VZjTTZ6ltrk1HGhsa2/zdtu7KDS3gD68dzI2t3h72wwqS6uPt9552uwTmxDoZAa9i0qzT2iD3s4GoLM+QfKu9c3etd47w5tggWj0w0NNPgFuaocB9g5Vk3cSNXmrjSZQmFrbvb0Fhak94K10m7wLU1MLiJK3em1qgW5750GTd2lraoZ2Q/6EJp9GsMnH3ybvOIVAerV6ewuLa6NPXvgEORgONAUD3h2BJm893OSTzKAVCza2+RIam9p9/PUu8E2enZoQmEzxLnghUB98WuyQd5kMtcEItXi2LCGfdjDkraBC3tkaaoFeepeLEGjsfHoZoWZvt5ug294NVAiWuaB3dEPepTzkXdxCsLg1Nnq766N1Qz7BBe1pa8APb25p9K7aoQCc7PDJJ5/oepdU77zxiWbQuwAHgeZs8S6lwVYwd+KjZYLeSjXo3RsJejcxwSYwjeZj1bu7EQx5loJg0Dsngt6lIAhKQYt3HQ0GfFLdW5kFQDPY1OYdpIB3jgTaoF3vBAr4OOudWQHvXmCgOdwW8KkqAaA1WryraKA5HAi0N3qr/YDn7ObsQMg78QMh79rg06YGgqBIB7w1RiDoEx6f4hfwiWHA28XGds/aHqjyQIYDuRJO58DWDC2TzSnxiYZIS0YyxtPqhUVQcEsXfDSwyqAYb6DlwXQ2IxvywgLJiHA4Yl5alQMnWcPxVMQii6f6DVllXgaflOkE74eAnYITVm61bIXxLMk2xp10dkF9Q4OTsVKLxzfPpNJLFD27xYCxXrhcjZlM4z2TIZjVS5YsDe+0XXibpcuWdHRYDBL4vXhnQ7Z4ZwRBEQzBEQIhEQqhEQZhEQ6h4ccjAiIiEiIjNFKBDEOGIyOQkcgopBKpQqqR0QiNjEFqkLHIOGQ8UovQSB0yAZmITEImIzQyBZmKTEPqkQZkOjIDmYnMQmYjc5BGJIAEERoJIU1IM9KC0Egr0obQSDvSgcxF5iE0Mh9ZgGyCbIpshiyEYViEbI5sgWyJ0MhWyNbINsi2yGJkCbIUoZHtkO2RZcgOCI0sR3ZEdkJWQP7O8P8rkV0QGtkV2Q2adof/3wPZE/67FxI240cjeyM0oiCdCI1EkCiiQlkMoZEupBvREBrpQWikF4kjCYRGkkgKSSOrkAyiI1kkh/Qh/QV3BpBB+O9qZB9kX2Q/+HsNsj9yAEIjByIHIQcjhyCHIjRyGHL4/6TxEciRyFHI0cgxyLHIcaYLxyMnICeav09CTkZOQU5FTjPNpyM0cgZyJnIWcjZyDpSci5yHnI9cgKxFaORC5CLkYuSSQljmIpcilyGXm6YrkCuRq5CrkWuQa6H5OuR65AbkRuQm5GbkFuRW5DbkduQOk3snchdyN3IPci9yH3I/8gDyIPIQ8nDBXfA9gjyKPIY8jjyBPIk8hTyNPGPKn0WeQ55HXkBeRF5CXkZegbJXkdeQ15E3kDeRt5C3kXeQjRvftbj0HvI+8gHyIfIR8jHyCfLp/6T5Z8jnyDrkC+RL5Cvka+Qb5FvkO8j8HvkB+RH5CfkZ+QX5FfkNWY/8jvyBbLCFK//9ifyFbEQQFEW/Rr5GMBRHCdTJIVEKpVEGZVEO5VEBFVEJldEKdBg6HB2BjkRHoZ8glehapAqtLrELvtHoGLQGHYuOQ8ejtWgdOgGdjExEJ6GT0Up0CjrVxc40tB5tQKejM9CZ6Cx0NjoHbUQDaBANoU1oM9qCtqJt6CdIO9qBzkXnofNR4LubzzSyAN0E3RTdDF2ILkI3R7dAY8iW6Fbo1ug26LboYnQJuhTdDt0eXYbugC5Hd0R3QivRFa5xoJGd0ZXoLuiu6G7o7uge6J7oXmgY3RtV0E40gkZRFY2hXWg3qqE9aC8aRxNoEk2haXQVmvFwb6hPR7NoDu1D+9EBdBBdje6D7ovuh65B90cPQA9ED0IPRg9BD0UPQw9Hj0CPRI9Cj0aPQY9Fj0OPR09AT0RPQk9GT0FPLcvv09DT0TPQM9Gz0LPRc9Bz0fPQ89EL0LXohehF6MXoJeil6GXo5egV6JXoVejV6DXoteh16PXoDeiN6E3ozegt6K3obejt6B3onehd6N1oJXoPuha59x/G2u27D70ffQB9EH0IfRh9BD0bfRR9DH0cfQJ9En0KfRp9Bn0WfQ59Hn0BfRF9CX0ZfQV9FX0NfR19A30TfQt9G30HfRd9D30f/QD9EP0I/Rj9BL0P+RT9DP0cXYd+gX6JfoV+jX6DfouOQr9Dv0d/QH9Ef0J/Rn9Bf0V/Q9ejv6N/oJVoJboBXYX+6VG+/5PvL3QjimAohmE4RmAkRmE0xmAsxmE8JmAiJmEyVoENw4ZjI7CR2CisEqvCqrHR2BisBhuLjcPGY7VYHTYBm4hNwiZjU7Cp2DSsHmvApmMzsJnYLGw2NgdrxAJYEAthTVgz1oK1YuuRNqwd68DmYvMwEO/52AJsE2xTbDNsIbYI2xzbAtu4cUtsK+RkdCtsa2wbbFtsMbYEW4pth22PLcN2wJZjO2I7YSuwnbH/dmr87/9WYrtgu2K7Ybtje2B7YnthYWxvTME6sQgWxVQshnVh3ZiG9WC9WBxLYEkshaWxVVgG07EslsP6sH5sABvEVmP7YPti+2FrsP2xA7ADsYOwg7FDsEOxw7DDsSOwI7GjsKOxY7BjseOw47ETsBOxk7CTsVOwU7HTsNOxM7AzsbOws7FzsHOx87DzsQuwtdiF2EXYxdgl2KXYZdjl2BXYldhV2NXYNdi12HXY9dgN2I3YTdhk5GbsFuxW7DbsduwO7E7sLuxu7BDkHuxe7D7sfuwB7EHsIWwE8jD2CPYodg/6GPY49gT2JPYU9jT2DPYs9hz2PPYC9iL2EvYy9gr2KvYa9jr2BvYm9hZWiRrf29jb2DsY0GTvYuDbgO6GvIe9j61F1iIfYB9iH2EfY59gn/4/UAby32fY59g67AvsS+wr7GvsG+xb7Dvse+wH7EfsJ+xn7BfsV+w3bD32O/YHtgH7E/sL24ghOIpjOI4TOIlTOI0zOItzOI8LuIhLuITPRWS8Ah+GD8dH4CPxUXglXoVX46PxMXgNPhYfh4/Ha/E6fAI+EZ+ET8an4FPxaXg9PgNtwKfjM/CZ+Cx8Nj4Hb8QDeBAP4U14M96Ct+JteDvegc/F5+Hz8QX4Jvim+Gb4QnwRvjm+Bb4lviW+Fb41vg2+Lb4YX4IvxbfDt8eX4Tvgy/Ed8Z3wFfjO+Ep8F3xXfDd8d3wPfE98LzyM740reCcewaO4isfwLrwb1/AevBeP4wk8iafwNL4Kz+A6nsVzeB/ejw/gg/hqfB/8PmRffD98Db4/fgB+IH4QfjB+CH4ofhh+OH4EfiR+FH40fgx+LH4cHkaOx6/FTsBPxE/CT8ZPwU/FT8NPx8/Az8TPws/Gz8HPxc/Dz8cvwNfiF+IX4Rfjl+CX4pfhl+NX4FfiV+FX49fg1+LX4dfjN+A34jfhN+O34Lfit+EjkNvxO/A78bvwu/F78Hvx+/D78QfwB/GH8IfxR/BH8cfwx/En8Cfxp/Cn8WfwZ/Hn8OfxF/AX8Zfwl/FXsFewV/BX8Y0bN258DX8dfwN/E38Lfxt/B38Xfw9/H/8A/xD/CP8I/xj/BP8U/wz/HF+Hf4F/iX+Ff41/g3+Lf4d/j/+A/4j/hP+M/4L/iv+Gr8d/x//AN+Ab8D/xv/BKdCMOvncwhECJONqGYgROJKCUIEB9ugcliaWYgW+HFRkUQRMMwRIcwRM8IRACIRISIRMVxDBiODGCGEmMIiqJKqKaGE2MIWqI/9O15t/v//ZvLDGOGE/UEnXEBGIiMYmYTEwhphLTiI1oPdFATCdmEDOJWcRsYg7RSASIIBEimohmooVoIVqJNqKd6CDmEvOI+cQCYhNiU2IzYiGxiNic2ILYktiK2JrYhtiWWEwsIZYS2xHbE8uIHYjlxI7ETsQKYmdiJbELsSuxG7E7sQexJ7EXESb2JhSik4gQUUIlYkQX0U1oRA/RS8SJBJEkUkSaWEVkCJ3IEjmij+gnBohBYjWxD7EvsR+xhtifOIA4kDiIOJg4hDiUOIw4nDiCOJI4ijiaOIY4ljiOOJ44gTiROIk4mTiFOJU4jTidGETPIM4kZqBnEWcT5xDnEucRAnY+cQGxlkhjFxIXERcTlxAIcSlxGXE5cQVxJXEVcTVxDXEtcR1xPXEDcSNxE3EzcQtxK3EbcRtxO3EHcSdxF3E3cQ9xL3EfcT/xAPEg8RDxMPEI8SjxGPE48QTxJPEU8TTxDPEs8RzxPPEC8SLxEvEy8QrxKvEa8TrxBvEm8RbxNvEO8S7xHvE+8QHxIfER8THxCfEp8RnxObGO+IL4kviK+Jr4hviW+I74nviB+JH4ifiZ+IX4lfiNWE/8TvxBbCD+JP4iNhIIiZIYiZMESZIUSZMMyZIcyZMCKZISKZMV5DByODmCHEmOIivJKrKaHE2OIWvIseQ4cjxZS9aRE8iJ5CRyMjmFnEpOI+vJBnI6OYOcSc4iZ5NzyEYyQAbJENlENpMtZCvZRraTHWQHOZecR84nF5CbkJuSm5ELyUXk5uQW5JbkVuTW5DbktuRicgm5lNyO3J5cRu5ALid3JHciV5A7kyvJXchdyd3I3ck9yD3JvcgwuTepkJ1khIySKhkju8huUiN7yF4yTibIJJki0+QqMkPqZJbMkX1kPzlADpKryX3Ifcn9yDXk/uQB5IHkQeTB5CHkoeRh5OHkEeSR5FHk0eQx5LHkceTx5AnkieRJ5MnkKeSp5Gnk6eQZ5JnkWeTZ5DnkueR55PnkBeRa8kLyIvJi8hLyUvIy8nLyCvJK8iryavIaEiOuJa8jrydvIG8kj8fXoevg+CuMHIevQ8FfGFmPrEfWoTeRN5O3kLeSt5G3k3eQd5J3kXeTd5P3kPeS95H3kw+QD5IPkQ+Tj5DLkeXIo+Rj5OPkE+ST5FPk0+Qz5LPkc+Tz5Avki+RL5MvkK+Sr5GvkeuR18g3yTfIt8m3yHfJdchT6HnkB/j75Afkh+RH5MfkJeQn+KfkZ+Tm5jvyC/JK8DP+K/Jr8hvyW/I78nvyB/JH8ifyZ/IX8lfyNXE/+Tv5BbiD/JP8iN5IIhVIYdTOOUwRFUhRFUwzFUhzFUwIlUhIlUxXUMGo4NYIaSY2iKqkqqpqqpkbDz60lA3IRGUONRBZiNdRYahw1nqql6qgJ1ERqEjWZmkJNpaZR9VQDNZ2aQc2kZlGzqTlUIxWgglSIaqKaqRaqlWqj2qkOai41j5pPLaA2oTalNqMWUouozSnQhm9BbUltRYFWfGtqG2pbajG1hFpKbUdtTy2jdqCWUztSO1ErqJ2pldQu1K7UbtTu1B7UntReVJjam1KoTipCRSmVilFdVDelUT1ULxWnElSSSlFpahWVoXRqNfkdnqVyVB/VTw1Qg9Rqah9qX2o/ag21GNuf+hE/gDqAOpA6iDqIOpg6hDqUOow6nDqCOpI6ijqa+hk/hjqWOo46njqBOoE6kTrJ/E6mTqZOoU6hTqVOpU5zfKdTp1NnUGdQZ1JnUmdZvrPhdw51LnUedT51AbWWWku9iV1IgR7HRdSfuNtXaY5dL6YuoS6lLqMup66g3sPew66krqJuI66mrqZoIv9dQ11DXUtdR11P3UDdQN1I3UTdRN1M3UzdQt1C3UrdSt1G3UbdTt1B3UndRd1N3UPdS91H3U89QD1IPUQ9TD1CPUo9Rj1OPUE9ST1FPU09Qz1LPUc9T71AvUi9RL1MvUKNIl6lPsY+xl6jXqeqiTeoN6m3qLepd6h3qfeo96kPqA+p/9Pt4L/fv9+/37/fv9+/37/fv9+/37/fv9+/37/fv9+/37/fv9+/37/f/2/fR9TH1CfUp9Rn1OfUOuoL6kvqK+praiP6DfUt9R31PfU99QP1I/Uj9RP1M/UL9Sv1K/UbtZ5aT/1O/UFtoDZQf1J/UX9RG8FWURqlZxIYjdMEPZsgaYqmaYZmaY7maYEWaYmW6Qp6GD2cHkGPpEfRlXQVXU2PpkfTY+gaeiw9jh5P19J19AR6Ij2JnkxPoafS0+h6uoGeTn+HzaBn0rPo2fQcupEO0AE6SIfoJrqZbqFb6Ta6ne6g59Lz6Pn0AnoTelN6M3ohvYjenN6C3pLeit6a3obell5ML6GX0tvR29PL6B3o5fSO9E70CnpneiW9C70rvRu9O70HvSe9Fx2m96aXEwrdSUfoKK3SMbqL7qY1uofupeN0gk7SKTpNr6IztE7rdJbO0jm6j+6nB+hBejW9D70vvR+9ht6fPoA+kD6IPpg+hD6UPow+nD6CPpI+ij4afsfQx9LH0cfTJ9Anmt9J9Mn0KfSp9Gn06fQZ9Jn0WfRy5Gz6HPpcWsbPo8+nL6DX0hfSF9EX05fQl9KX0ZfTV9BX0lfRV9PX0NfS19HX0zfQN9I30TfTt9C30rfRt9N30HfSd9F30/fQ99L30ffTD9AP0g/RD9OP0I/Sj9GP00/QT9JP0k/RT9PP0M/Sz9HP0y/QL9Iv0S/Tr9Cv0q/Sr9Gv06/Tb9Bv0m/Sb9Fv02/T79Dv0u/R79Hv0x/QH9If0R/RH9Of0J/Sn9Kf0Z/T6+gv6C/oL+mv6K/pr+lv6G/pb+nv6O/pH+gf6Z/on+lf6F/p3+j19O/0H/QG+k/6L3ojjTAogzE4QzAkQzE0wzAswzE8IzAiIzEyU8EMY4YzI5iRzCimkqliqpnRzBimhhnLjGPGM7VMHTOBmchMYiYzU5ipzDSmnmlgpjMzmJnMLGY2M4dpZAJMkAkxTUwz08K0Mm1MO9PBzGXmMfOZBcwmzKbMZsxCZhGzObMFswWzJbMVszWzDbMNsy1zArGYUZAlzFJmO2Z7ZhmzjNmBWc6cTOzI7MSsYHZmVjK7MLswuzK7MbszezB7MnsxYWZvRmEUppOJMFEmyqhMjOliuhmN0ZgeppeJM3EmwSSZFJNi0swqJsNkGJ3JMjmmj+lnBphBZjWzD7MPsy+zH7OG2Z/ZnzmAOZA5iDmIOZg5hDmUOYw5jDmcOYI5lTiSOYo5ijmaOYY5ljmWOY45njmBOYE5kTmJOZk5mTmFOZU5jalHTmfOYM5kzmJOJ85mzmHOZc5jzmcuYNYyFzIXMRczlzCXMpcxlzNXMFcyVzFXM9cw1zLXMdczNzAzUPDdyNzE3MzcwtzK3MbcztzB3MncxdzN3MPcy9zH3M88wDzIPMQ8zDzCPMo8xjzOPME8yTzFnEc8zTzDPMs8xzzPvMC8yLzEvMy8wrzKvMa8zrzBvMm8xbzNvMO8y7zHvM98wHzIfMR8zHzCfMp8xnzOrGO+YL5kvmK+Zr5hvmW+Y75nfmB+ZH5ifmZ+YX5lfmPWM78zfzAbmD+Zv5iNDMKiLMbiLMGSLMXSLMOyLMfyrMCKrMTKbAU7jB3OjmBHsqPYSraKrWZHs2PYGnYsO44dz9aydewEdiI7iZ3MTmGnstPYeraBnc7OYGeys9jZ7By2kQ2wQTbENrHNbAvbyrax7WwHO5edx85nF7CbsJuym7EL2UXs5uwW7JbsVuzW7Dbstuxidgm7lN2O3Z5dxu7ALmd3ZHdiV7A7syvZXdhd2d3Y3dk92D3ZvdgwuzersJ1shI2yKhtju9huVmN72F42zibYJJti0+wqNsPqbJbNsX1sPzvADrKr2X3Yfdn92DXs/uwB7IHsQezB7CHsoexh7OHsEeyR7FHs0ewx7LHscezx7AnsiexJ7MnsKeyp7Gns6ewZ7JnsWezZ7Dnsuex57PnsBexa9kL2IvZi9hL2UvYy9nL2CvZK9ir2avYa9lr2OvZ69gb2RvYm9mb2FvZW9jb2dvYO9k72LvZu9h72XvY+9n72fvYB9kH2IfZh9hH2UfYx9nH2CfZJ9in2afYZ9ln2OfZ59gX2RfZG4iX2ZfYV9lX2NfZ19g32TfYt9m32HfZd9j32ffYD9kP2I/Zj9hP2U/Yz9nN2HfsF+yX7Ffs1+w37Lfsd+z37A/sj+xP7M/sL+yv7G7ue/Z39g93A/sn+xW5kEQ7lMA7nCI7kKI7mGI7lOI7nBE7kJE7mKrhh3HBuBDeSG8VVclVcNTeaG8PVcGO5cdx4rpar4yZwE7lJ3GRuCjeVm8bVcw3cdG4GN5Obxc3m5nCNXIALciGuiWvmWrhWro1r5zq4udw8bj63gNuE25TbjFvILeI257bgtuS24rbmtuG25RZzS7il3Hbc9twybgduObcjtxO3gtuZW8ntwu3K7cbtzu3B7cntxYW5vTmF6+QiXJRTuRjXxXVzGtfD9XJxLsEluRSX5lZxGU7nslyO6+P6uQFukFvN7cPty+3HreH25w7gDuQO4g7mDuEO5Q7jDueO4I7kjuKO5o7hjuWO447nTuBO5E7iTuZO4U7lTuNO587gzuTO4s7mzuHO5c7jzucu4NZyF3IXcRdzl3CXcpdxl3NXcFdyV3FXc9dw13LXcddzN3A3cjdxN3O3cLdyt3G3c3dwd3J3cXdz93D3cvdx93MPcA9yD3EPc49wj3KPcY9zT3BPck9xT3PPcM9yz3HPcy9wL3IvcS9zr3Cvcq9xr3NvcG9yb3Fvc+9w73Lvce9zH3Afch9xH3OfcLcTn3KfcZ9z67gvuC+5r7ivuW+4b7nvuO+5H7gfuZ+4n7lfuF+537j13O/cH9wG7k/uL24jh/Aoj/E4T/AkT/E0z/Asz/E8L/AiL/EyX8EP44fzI/iR/Eh+FF/JV/HV/Gh+DF/Dj+XH8eP5Wr6On8BP5Cfxk/kp/FR+Gl/PN/DT+Rn8TH4WP5ufwzfyjXyAD/Ihvolv5lv4Vr6Nb+c7+Ln8PH4+v4DfhN+U34xfyC/iN+e34Lfkt+K35rfht+UX80v4pfx2/Pb8Mn4Hfjm/I78Tv4LfmV/J78Lvyu/G787vwe/J78WH+b15he/kI3yUV/kY38V38xrfw/fycT7BJ/kUn+ZX8Rle57N8ju/j+/kBfpBfze/D78vvx6/h9+cP4A/kD+IP5g/hD+UP4w/nj+CP5I/ij+aP4Y/lj+OP50/gT+RP4k/mT+FP5U/jT+fP4M/kz+LP5s/hz+XP48/nL+DX8hfyF/EX85fwl/KX8ZfzV/BX8lfxV/PX8Nfy1/HX8zfwN/I38Tfzt/C38rfxt/N38Hfyd/F38/fw9/L38ffzD/AP8g/xD/OP8I/yj/GP80/wT/JP8U/zz/DP8s/xz/Mv8C/yL/Ev86/wr/Kv8a/zb/Bv8m/xDxBv8+/w7/Lv8e/zH/Af8h/xH/Of8J/yn/Gf8+v4L/gv+a/4r/lv+G/57/jv+R/4H/mf+J/5X/hf+d/49fzv/B/8Bv5P/i9+I48IqIAJuEAIpEAJtMAIrMAJvCAIoiAJslAhDBOGCyOEkcIooVKoEqqF0cIYoUYYK4wTxgu1Qp0wQZgoTBImC1OEqcI0oV5oEKYLM4SZwixhtjBHaBQCQlAICiGhSWgWWoRWoU1oFzqEucI8Yb6wQNhE2FTYTFgoLBI2F7YQthS2ErYWthG2FRYLS4SlwnbC9sIyYQdhubCjsJOwQthZWCnsIuwq7CbsLuwh7CnsJYSFvQVF6BQiQkSICqoQE7qEbkETeoReIS4khKSQEtLCKmE1Br6MoAtZISfkhD6hXxgQBoXVwj7CvsJ+whrhMWJ/4QDhQOEg4WDhEOFQ4TDhcOEI4UjhKOFo4RjhWOE44XjhBOFE4SThJOFk+J0inCKcKpwmnC6cIZwpnCU8QZwtnCOcI5wrnCecL5wvXCCsFS4ULhIuFi4RLhUuEy4XrhCuFK4SrhauEVrxp4in4H6va4XrhOuFG4QbhZuEm4VbhFuF24TbhduFO4Q74XeXcLdwj3CPcK9wn3C/8IDwoPCQ8LDwiPCo8JjwuPCE8KTwlPC08IzwrPCs8Bz8nheeF94gXhBeFF4SXhbeJF4RXoXfa8LrwhvCm8JbwlvE28I78HtXeE94X/hA+FD4SPhYeJv4RPhU+Ez4XFgnfCF8KXwlfC18I3wrfCd8J3wv/CD8IPwIv5+En4SfhV+EX4XfhPXC78Lvwh/w2yBsEP4U/hI2CoiIipiIi4RIipRIi4zIipzIi4IoipL4LiGLM9EKcZg4XBwhjhRHiZXie0SVWC2OFseINeJYcZw4Xhwv1op14gRxojhJnCxOEQ/EporTxHqxQWwQp4szxJniLHG2OEdsFANiUAyJIbFJbBKbxRaxVWwTPyXaxXaxQ+wQ54rzxHXEfHGBuIm4qbiZuFBcJG4ubiFuKW4lbi1uI24rLhaXiEvF7cTtxWXiDuJycUdxJ3GFuLO4Ulwp7iLuKu4m7i7uIe4pbo/vJYbFvUVF7BQjYlRUxZjYJV6Gdoua2CP2inExISbFlJgWV4kZURezYk7sE/vFAXFQXC3uI+4r7ifuJ64R9xcPEA8UDxIPFg8RDxUPFQ8TDxePEI8UjxKPFo8RjxWPE48XTxBPFE8SJVIiTxZPEU8VTxNPF88QzxTPEs8WzxHPFc8VzxPPFy8Q14oXiheKF4kXi5eIl4o745eJl4tXiFea31Xi1eI14rXideL14g3ijeKN4k3izeIt4q3ibeLt4h3ineKd4l3iXeLd4j3iveJ94v3iA+ID4oPiQ+LD4iPio+Jj4uPiE+IT4pPiU+LT4jPis+Jz4vPiC+K5yIviS+JL4sviK+Kr4mvia+Lr4hvim+Jb4lvi2+I74rvie+L74vviB+KH4kfix+LH4ifip+Jn4ufiOnGd+IX4pfiV+LX4jfit+J34nfi9+IP4o/iT+LP4s/iL+Kv4m/ibuF78XfxD3CBuEP8U/xI3gqOTEiphEi4REilREiXREiMxEitVk5zES4IkSpIkSxXSMGm4NEIaKY2SKqUqqVoaLY2RaqSx0lhpnDReqpXqpAnSRGmiNEmaLE2RpkpTpWlSvdQgTZfAPrsZ0kxpljRbmiPNkRqlgBSUQlKT1Cw1Sy1Sq9QmtUvtUoc0V5onzZfmSwukTaRNpQnkZtJCaZG0ubSFtKW0pbSVtLW0jTSR3FZaLC2RlkrbSdtLy6RabAdpB2m5tKO0k7RC2llaKe0i7SLtKu0m7S7tIe0h7SntJYWlvSVF6pQiUlRSJVWKSV1SN/w0qUfqkXqluLQcSUhJKSWlpVVSRtKlrBQiwZeT+qR+aUAalFZL+0j7SvtJa6T9pQOkA6WDpIOlg6VDpEOkQ6VDpcOkw6TDpcOlI6QjpCOlI6WjpKOko6WjpWOkY6RjpWOl46TjpOM9vxOkE6WTpJOlU6RTpdOk06UzpDOls6SzpXOkc6XzpPOlC6S10oXSRdLF0iXSpdJl0uXSFdKV0lXS1dI10jXStdJ10vXSDdKN0k3SzdIt0q3SrdJt0m3S7dId0p3SXdLd0j3SvdJ90v3SA9KD0kPSw9Ij0qPSY9Lj0hPSk9JT0tPSM9Kz0nPS89IL0ovSS9LL0ivSq9Jr0uvSG9Kb0lvS29I70rvSe9L70gfSh9JH0sfSJ9Kn0mfS59I66QvpS+kr6WvpG+lb6Tvpe+kH6UfpJ+ln6RfpV+k3ab30u/SHtEH6U/pL2ighMipjMi4TMml+lEzLjMzKnMzLgizKkizLFbJODZOHyyPkkfIouVKukqvl0fIYuUYeK4+Tx8u1cp08QZ4oT5Iny1PkqfI0uV5ukKfLM+SZ8ix5tjxHbpQDclAOyU3yPjj4muX7EO+vRW6V2+R2uUOeK8+T58sL5E3kTeXN5M3khfIieXN5C3lLeSt5a3kbeVt5sbxEXipvJ28vL5N3kJfLO8o7ySvkneWV8i7yrvJu8u7yHvKe8l5yWN5bVuROOSJHZVWOyV1yt6zJPXKvHJcTckI+iUzKKTktr5Izsi5n5ayck/vkfnlAHpRXy/vI+8r7yWvk/eUD5APlg+SD5UPkQ+XD5MPlI+Qj5aPg39HyMfDvWPk4+He8fAL8O1E+qfB3snyKfKp8Gvw7XT4D/p0pnyWfLZ8jnyOfK58nny9fIK+VL5Qvki+WL5EvkS+VL5Mvl6+Qr5Svkq+Wr5Gvla+Tr5dvkG+Ub5Jvlm+Rb5Vvk2+X75DvlO+S75bvke+V75Pvlx+QH5Qfkh+WH5EflR+TH5efkJ+Un5Kflp+Rn5Wfk5+XX5BflF+SX5ZfkV+VX5Nfl9+Q35Tfkt+W35Hfld+T35c/kD+UP5I/lj+RP5U/kz+X18lfyF/KX8lfy9/I38rfyd/LP8g/yj/JP8u/yL/Kv8nr5d/lP+QN8p/yX/JGGalAK7AKvIKoICuoCrqCqWAruAq+QqgQK6QKuaKiYljF8IoRFSMrRlVUVlRVVFeMrhhTUVMxtmJcxfiK2oq6igkVEysmVUyumFIxtWJaRX1FQ8X0ihkVM/9XoeYZXQWVReG893jYdX87Yu9il947hN4h9Bp67733DiH03nsPEDqEToBAKCooCopiw5ZgA0VlVoZhHGetce734+57z7n7/Lx/trIoq7Ipu4IZciincim38iiv8im/CqigCqmwiqioiqm4SihKJVVKpVVGZVVO5VVBFVVJlVVFVVVN1RUXusPVQLTiQjWUnlW+rf57/7Py9+p27jla6Xcxf3H7O/fYwJ13caEJgf883/H5c1LMX6ZODP2vym2VFkoL1VQt1VYd1VVd7QzXU301UEM1UmPFqImaqpmaq4VaqKVaqbXaqK3aqp3aq4M6Kj7YSZ3VRV2UGO6qbuquveEe6qle6q0+2hfuq37qrwEaqEEarP3hIRqqYRquERqpURqtMRqrcRqvCYrVRMVpkiZritL/n+iIqZqmaZquGZqppPAszdYczdU8zdcCLdQiLdYSLdUyLdcKrdQqrdYardU6rdcGxWujNmmzEpSgLdqqrdqm7dqhyEBkYKd2KSG4W3uUqPPhvdqn/TqggzqkwzqiJB3VMR1Xsk7opFJ0Sqd1Rmf1lt7WOzqn83pX7yk1kBq4oAt6Xx/ooi7qki7pQ32ky/pYn+iKrihT4FN9ps/1hb7UVX2lr/WNvtV3SlWq0nTtX3yvH/Sj4gJxgZ/0s67rui6Hb+gX/aqb+k2/6w/dUgQBgoTIQHREmIzcxd3cw73cx/08wIM8hAATycNk4hEe5TEe5wme5Cme5hme5Tme5wVeJDMv8TKv8Cqv8Tpv8CZZyEo2spOdHOQkNpCL3KSF85CXa+Hb5CM/BShIIQpThKIUozgluBGOoiSlKE0ZylKO8lSgIpWoTBVuhqtSjepEU4Oa1KI2dYgP1aUe9WlAQxrRmBia0JRmNKcFLWlFazaG2tCWdrSnAx3pRGe60JV8gW50pwc96UVv+tCXfvRnAAMZxGCKB4cwlGEMZ0sonRGMZBSjGcNYxjGeCcQykTgmMZkpTGUa05nBTGYRGTGb9GT+HOYyl3nMYz7zWcBCFrGYo8HBEUtYQmIoMbSUqGBUcBnLWcFKVrGaNaxlHevZQDwb2cRmEtjCVraxnR3sJDm4i93/ZA+J7GUfmTPu5wAHiY44xGGOkEQSRznGcZJJ5gQnOUkKKZziNGc4y1u8zTuc4zzv8h4XeJ8PuMglPuQjLvMxn3CFT/mMz/mCL7nKV3zNN3zLd6RyLpjGNb7nB37kJ37mOjf4hV+5yW/8zh/cIsIBBx1yBoed0Xf5bt/je32f7/cDftAPWcZ2pB92Jj/iR/2YH/cTftJP+Wk/42f9nJ/3C37Rmf2SX/YrftWv+XW/4TedxVmdzdmdwzmdy7mdx3mdz/ldwAVdyIVdxEVdzMVdwlEu6VIu7TIu63Iu7wqu6Equ7Cqu6mqu7mjXcE3Xcm3XcV3Xc303cEM3cmPHuImbupmbu4VbupVbu43bup3bu4M7upM7u4u7upu7u4d7upd7u4/7up/7e4AHepAHe4iHepiHe4RHepRHe4zHepzHe4JjPdFxnuTJnuKpnubpnuGZnuXZnuO5nuf5XuCFXuTFXuKlXublXuGVXuXVXuO1Xuf13uB4b/Qmb3aCt3irt3m7d3ind3m39zjRe73P+33AB33Ih33EST7qYz7uZJ/wSd/6vyvFKT7l0z7js//u/gfvMm/XysoCAA=="
};

// src/debug.ts
var cache = /* @__PURE__ */ new Map();
function loadMap(buildKey) {
  return __async(this, null, function* () {
    if (cache.has(buildKey)) return cache.get(buildKey);
    const b64 = WASM_SOURCE_MAP[buildKey];
    if (!b64) throw new Error(`No source map for build "${buildKey}"`);
    const gzipped = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(gzipped);
    writer.close();
    const buf = yield new Response(ds.readable).arrayBuffer();
    const dv = new DataView(buf);
    const bytes = new Uint8Array(buf);
    const firstId = dv.getUint32(0, true);
    const funcCount = dv.getUint32(4, true);
    const numNames = dv.getUint32(8, true);
    const td = new TextDecoder();
    const names = [];
    let pos = 12;
    for (let i = 0; i < numNames; i++) {
      const len = bytes[pos++];
      names.push(td.decode(bytes.subarray(pos, pos + len)));
      pos += len;
    }
    const funcNames = [];
    for (let i = 0; i < funcCount; i++) {
      const idx = dv.getUint16(pos, true);
      pos += 2;
      funcNames.push(idx === 65535 ? null : names[idx]);
    }
    const entry = { firstId, funcNames };
    cache.set(buildKey, entry);
    return entry;
  });
}
var Debug = {
  /**
   * Resolves a list of wasm function indices to their cleaned symbol names.
   */
  decodeFuncIds: (funcIds, isCompatBuild) => __async(void 0, null, function* () {
    const buildKey = isCompatBuild ? "compat" : "default";
    const { firstId, funcNames } = yield loadMap(buildKey);
    return funcIds.map((funcId) => {
      const i = funcId - firstId;
      const name = i >= 0 && i < funcNames.length && funcNames[i] ? funcNames[i] : "(unknown)";
      return { funcId, name };
    });
  }),
  /**
   * Annotates a wasm stack trace string with resolved function names.
   *
   * Example input from Chrome:
   *   at http://localhost:8080/esm/wasm/wllama.wasm:wasm-function[775]:0x74251
   *   at async blob:http://localhost:8080/53a863cc-7227-45cc-8594-ddbbf5257f20:317:28
   *
   * Example input from Firefox:
   *   @http://localhost:8080/esm/wasm/wllama.wasm:wasm-function[796]:0x7dfe2
   *       at wModuleInit/WebAssembly.promising/< (9b6a2acd-d909-44e2-b021-d42fb9087cfb:15:32) index.js:1433:45
   *
   * Example input from Safari:
   *   2441@wasm-function[2441]
   *       at wrapper (d746f19e-4523-4f36-ba06-d0969acc0b05:22:126009)
   *
   * Example output:
   *   wasm-func[775] (server_response::send)
   */
  decodeStackTrace: (stack, isCompatBuild) => __async(void 0, null, function* () {
    const re = /wasm-function\[(\d+)\]/g;
    const funcIds = [
      ...new Set([...stack.matchAll(re)].map((m) => parseInt(m[1])))
    ];
    if (funcIds.length === 0) return stack;
    const resolved = yield Debug.decodeFuncIds(funcIds, isCompatBuild);
    return resolved.map((r) => {
      if (r.name === "(unknown)") {
        return `    wasm-func[${r.funcId}] (unknown)`;
      }
      return `    wasm-func[${r.funcId}] (${r.name})`;
    }).join("\n");
  })
};

// src/utils.ts
var textDecoder = new TextDecoder();
var URL_PARTS_REGEX = /-(\d{5})-of-(\d{5})\.gguf(?:\?.*)?$/;
var parseShardNumber = (fnameOrUrl) => {
  const matches = fnameOrUrl.match(URL_PARTS_REGEX);
  if (!matches) {
    return {
      baseURL: fnameOrUrl,
      current: 1,
      total: 1
    };
  } else {
    return {
      baseURL: fnameOrUrl.replace(URL_PARTS_REGEX, ""),
      current: parseInt(matches[1]),
      total: parseInt(matches[2])
    };
  }
};
var sortFileByShard = (blobs) => {
  const isFiles = blobs.every((b) => !!b.name);
  if (isFiles && blobs.length > 1) {
    const files = blobs;
    files.sort((a, b) => {
      const infoA = parseShardNumber(a.name);
      const infoB = parseShardNumber(b.name);
      return infoA.current - infoB.current;
    });
  }
};
var isMmproj = (blob) => __async(void 0, null, function* () {
  const META_NAME = "general.architecture";
  const META_VAL = "clip";
  const tmp = blob.slice(0, 128 * 1024);
  const header = yield tmp.arrayBuffer();
  const buf = new Uint8Array(header);
  const nameBytes = new TextEncoder().encode(META_NAME);
  const valBytes = new TextEncoder().encode(META_VAL);
  let offset = -1;
  outer: for (let i = 0; i <= buf.length - nameBytes.length; i++) {
    for (let j = 0; j < nameBytes.length; j++) {
      if (buf[i + j] !== nameBytes[j]) continue outer;
    }
    offset = i;
    break;
  }
  if (offset === -1) return false;
  if (offset + 8 * 4 + 4 > buf.length) return false;
  const view = new DataView(header);
  const valLen = view.getBigUint64(offset + 8 * 3, true);
  if (valLen !== /* @__PURE__ */ BigInt("4")) return false;
  for (let i = 0; i < valBytes.length; i++) {
    if (buf[offset + 8 * 4 + i] !== valBytes[i]) return false;
  }
  return true;
});
var absoluteUrl = (relativePath) => typeof document === "undefined" ? new URL(relativePath, self.location.href).href : new URL(relativePath, document.baseURI).href;
var padDigits = (number, digits) => {
  return Array(Math.max(digits - String(number).length + 1, 0)).join("0") + number;
};
var sumArr = (arr) => arr.reduce((prev, curr) => prev + curr, 0);
var isString = (value) => !!(value == null ? void 0 : value.startsWith);
var MMPROJ_FILE_NAME = "mmproj.gguf";
var prepareBlobs = (blobsInp) => __async(void 0, null, function* () {
  const blobs = [];
  let blobMmproj = null;
  for (const blob of blobsInp) {
    if (yield isMmproj(blob)) {
      blobMmproj = blob;
    } else {
      blobs.push(blob);
    }
  }
  sortFileByShard(blobs);
  const result = blobs.map((blob, i) => ({
    blob,
    name: `model-${padDigits(i + 1, 5)}-of-${padDigits(blobs.length, 5)}.gguf`
  }));
  if (blobMmproj) {
    result.push({
      blob: blobMmproj,
      name: MMPROJ_FILE_NAME
    });
  }
  return {
    llm: result.filter((f) => f.name !== MMPROJ_FILE_NAME),
    mmproj: blobMmproj ? { blob: blobMmproj, name: MMPROJ_FILE_NAME } : null,
    all: result
  };
});
var isSupportMultiThread = () => ((e) => __async(void 0, null, function* () {
  try {
    return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
  } catch (e2) {
    return false;
  }
}))(
  new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    2,
    1,
    0,
    5,
    4,
    1,
    3,
    1,
    1,
    10,
    11,
    1,
    9,
    0,
    65,
    0,
    254,
    16,
    2,
    0,
    26,
    11
  ])
);
var isSupportExceptions = () => __async(void 0, null, function* () {
  return WebAssembly.validate(
    new Uint8Array([
      0,
      97,
      115,
      109,
      1,
      0,
      0,
      0,
      1,
      4,
      1,
      96,
      0,
      0,
      3,
      2,
      1,
      0,
      10,
      8,
      1,
      6,
      0,
      6,
      64,
      25,
      11,
      11
    ])
  );
});
var isSupportSIMD = () => __async(void 0, null, function* () {
  return WebAssembly.validate(
    new Uint8Array([
      0,
      97,
      115,
      109,
      1,
      0,
      0,
      0,
      1,
      5,
      1,
      96,
      0,
      1,
      123,
      3,
      2,
      1,
      0,
      10,
      10,
      1,
      8,
      0,
      65,
      0,
      253,
      15,
      253,
      98,
      11
    ])
  );
});
var isSupportJSPI = () => {
  return !!WebAssembly.Suspending;
};
var isSupportWebGPU = () => {
  return !!navigator.gpu;
};
var isSupportMem64 = () => {
  try {
    new WebAssembly.Memory({
      address: "i64",
      initial: /* @__PURE__ */ BigInt("1")
      // 1 page (64 KiB)
    });
    return true;
  } catch (e) {
    return false;
  }
};
var checkEnvironmentCompatible = () => __async(void 0, null, function* () {
  if (!(yield isSupportExceptions())) {
    throw new Error("WebAssembly runtime does not support exception handling");
  }
  if (!(yield isSupportSIMD())) {
    throw new Error("WebAssembly runtime does not support SIMD");
  }
});
var isFirefox = () => {
  return !!navigator.userAgent.match(/Firefox\/([0-9\.]+)(?:\s|$)/);
};
var GGUF_FILE_REGEX = /^.*\.gguf(?:\?.*)?$/;
var isValidGgufFile = (path) => {
  return GGUF_FILE_REGEX.test(path);
};
var isSafariMobile = () => {
  return !!navigator.userAgent.match(/Version\/([0-9\._]+).*Mobile.*Safari.*/);
};
var createWorker = (workerCode) => {
  const workerURL = URL.createObjectURL(
    isString(workerCode) ? new Blob([workerCode], { type: "text/javascript" }) : workerCode
  );
  return new Worker(workerURL, { type: "module" });
};
var cbToAsyncIter = (fn) => (...args) => {
  let values = [];
  let resolve;
  let reject;
  values.push(
    new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    })
  );
  fn(...args, (val, done, err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve([val, done]);
    values.push(
      new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      })
    );
  });
  return function() {
    return __asyncGenerator(this, null, function* () {
      let val;
      for (let i = 0, done = false; !done; i++) {
        [val, done] = yield new __await(values[i]);
        delete values[i];
        if (val !== void 0) yield val;
      }
    });
  }();
};
var canUseAsyncFileRead = (compat) => isSupportJSPI() || compat;
var needCompat = () => !isSupportJSPI() || !isSupportMem64();

// src/workers-code/generated.ts
var LIBLLAMA_VERSION = "b10663-83d855c";
var LLAMA_CPP_WORKER_CODE = "// Start the main llama.cpp\nlet wllamaMalloc;\nlet wllamaStart;\nlet wllamaAction;\nlet wllamaExit;\nlet wllamaDebug;\n\nlet Module = null;\nlet isCompat = false;\nlet lastStack = '';\nlet isAborted = false;\nlet hasMultithread = false;\n\n//////////////////////////////////////////////////////////////\n// UTILS\n//////////////////////////////////////////////////////////////\n\n// send message back to main thread\nconst msg = (data, transfer) => postMessage(data, transfer);\n\n// Convert CPP log into JS log\nconst cppLogToJSLog = (line) => {\n  const matched = line.match(/@@(DEBUG|INFO|WARN|ERROR)@@(.*)/);\n  return !!matched\n    ? {\n        level: (matched[1] === 'INFO' ? 'debug' : matched[1]).toLowerCase(),\n        text: matched[2],\n      }\n    : { level: 'log', text: line };\n};\n\nconst getHeapU8 = () => {\n  const buffer = Module.wasmMemory.buffer;\n  return new Uint8Array(buffer);\n};\n\nconst toSizeT = (num) => {\n  return isCompat ? Number(num) : BigInt(num);\n};\n\n// Get module config that forwards stdout/err to main thread\nconst getWModuleConfig = (_argMainScriptBlob) => {\n  var pathConfig = RUN_OPTIONS.pathConfig;\n  var pthreadPoolSize = RUN_OPTIONS.nbThread;\n  var argMainScriptBlob = _argMainScriptBlob;\n\n  isCompat = RUN_OPTIONS.compat;\n  hasMultithread = pthreadPoolSize > 1;\n\n  msg({\n    verb: 'console.debug',\n    args: [\n      `Multithread enabled: ${hasMultithread}, pthreadPoolSize: ${pthreadPoolSize}`,\n    ],\n  });\n\n  if (!pathConfig['wllama.wasm']) {\n    throw new Error('\"wllama.wasm\" is missing in pathConfig');\n  }\n  return {\n    noInitialRun: true,\n    print: function (text) {\n      if (arguments.length > 1)\n        text = Array.prototype.slice.call(arguments).join(' ');\n      msg({ verb: 'console.log', args: [text] });\n    },\n    printErr: function (text) {\n      if (arguments.length > 1)\n        text = Array.prototype.slice.call(arguments).join(' ');\n      if (text.startsWith('@@STACK@@')) {\n        lastStack = text.slice('@@STACK@@'.length);\n        return;\n      }\n      const logLine = cppLogToJSLog(text);\n      msg({ verb: 'console.' + logLine.level, args: [logLine.text] });\n    },\n    locateFile: function (filename, basePath) {\n      const p = pathConfig[filename];\n      const truncate = (str) =>\n        str.length > 128 ? `${str.substr(0, 128)}...` : str;\n      if (filename.match(/wllama\\.worker\\.js/)) {\n        msg({\n          verb: 'console.error',\n          args: [\n            '\"wllama.worker.js\" is removed from v2.2.1. Hint: make sure to clear browser\\'s cache.',\n          ],\n        });\n      } else {\n        msg({\n          verb: 'console.debug',\n          args: [`Loading \"${filename}\" from \"${truncate(p)}\"`],\n        });\n        return p;\n      }\n    },\n    mainScriptUrlOrBlob: hasMultithread\n      ? argMainScriptBlob\n      : 'throw new Error(\"Multithreading is not enabled\")',\n    pthreadPoolSize: hasMultithread ? pthreadPoolSize : 0,\n    wasmMemory: hasMultithread ? getWasmMemory() : null,\n    onAbort: function (message) {\n      isAborted = true;\n      msg({ verb: 'signal.abort', args: ['abort', message, lastStack, null] });\n    },\n    onExit: function (code) {\n      isAborted = true;\n      const callstack = new Error().stack.toString();\n      msg({\n        verb: 'signal.abort',\n        args: ['abort', 'exit(' + code + ')', callstack, null],\n      });\n    },\n  };\n};\n\n// Get the memory to be used by wasm. (Only used in multi-thread mode)\n// Because we have a weird OOM issue on iOS, we need to try some values\n// See: https://github.com/emscripten-core/emscripten/issues/19144\n//      https://github.com/godotengine/godot/issues/70621\nconst getWasmMemory = () => {\n  let minBytes = 128 * 1024 * 1024;\n  let maxBytes = 4096 * 1024 * 1024;\n  let stepBytes = 128 * 1024 * 1024;\n  while (maxBytes > minBytes) {\n    try {\n      const wasmMemory = new WebAssembly.Memory({\n        initial: toSizeT(minBytes / 65536),\n        maximum: toSizeT(maxBytes / 65536),\n        shared: true,\n        address: isCompat ? undefined : 'i64',\n      });\n      return wasmMemory;\n    } catch (e) {\n      maxBytes -= stepBytes;\n      continue; // retry\n    }\n  }\n  throw new Error('Cannot allocate WebAssembly.Memory');\n};\n\n//////////////////////////////////////////////////////////////\n// HEAPFS PATCH\n//////////////////////////////////////////////////////////////\n\n/**\n * By default, emscripten uses memfs. The way it works is by\n * allocating new Uint8Array in javascript heap. This is not good\n * because it requires files to be copied to wasm heap each time\n * a file is read.\n *\n * HeapFS is an alternative, which resolves this problem by\n * allocating space for file directly inside wasm heap. This\n * allows us to mmap without doing any copy.\n *\n * For llama.cpp, this is great because we use MAP_SHARED\n *\n * Ref: https://github.com/ngxson/wllama/pull/39\n * Ref: https://github.com/emscripten-core/emscripten/blob/main/src/library_memfs.js\n *\n * Note 29/05/2024 @ngxson\n * Due to ftell() being limited to MAX_LONG, we cannot load files bigger than 2^31 bytes (or 2GB)\n * Ref: https://github.com/emscripten-core/emscripten/blob/main/system/lib/libc/musl/src/stdio/ftell.c\n */\n\nconst fsNameToFile = {}; // map Name => File\nconst fsIdToFile = {}; // map ID => File\nlet currFileId = 0;\n\n// Patch and redirect memfs calls to wllama\nconst patchHeapFS = () => {\n  const m = Module;\n  // save functions\n  m.MEMFS.stream_ops._read = m.MEMFS.stream_ops.read;\n  m.MEMFS.stream_ops._write = m.MEMFS.stream_ops.write;\n  m.MEMFS.stream_ops._llseek = m.MEMFS.stream_ops.llseek;\n  m.MEMFS.stream_ops._allocate = m.MEMFS.stream_ops.allocate;\n  m.MEMFS.stream_ops._mmap = m.MEMFS.stream_ops.mmap;\n  m.MEMFS.stream_ops._msync = m.MEMFS.stream_ops.msync;\n\n  const patchStream = (stream) => {\n    const name = stream.node.name;\n    if (fsNameToFile[name]) {\n      const f = fsNameToFile[name];\n      const ptr = Number(f.ptr);\n      stream.node.contents = getHeapU8().subarray(ptr, ptr + f.size);\n      stream.node.usedBytes = f.size;\n    }\n  };\n\n  // replace \"read\" functions\n  m.MEMFS.stream_ops.read = function (\n    stream,\n    buffer,\n    offset,\n    length,\n    position\n  ) {\n    patchStream(stream);\n    return m.MEMFS.stream_ops._read(stream, buffer, offset, length, position);\n  };\n  m.MEMFS.ops_table.file.stream.read = m.MEMFS.stream_ops.read;\n\n  // replace \"llseek\" functions\n  m.MEMFS.stream_ops.llseek = function (stream, offset, whence) {\n    patchStream(stream);\n    return m.MEMFS.stream_ops._llseek(stream, offset, whence);\n  };\n  m.MEMFS.ops_table.file.stream.llseek = m.MEMFS.stream_ops.llseek;\n\n  // replace \"mmap\" functions\n  m.MEMFS.stream_ops.mmap = function (stream, length, position, prot, flags) {\n    patchStream(stream);\n    const name = stream.node.name;\n    if (fsNameToFile[name]) {\n      const f = fsNameToFile[name];\n      const mmapPtr = f.ptr + toSizeT(position);\n      return {\n        ptr: mmapPtr,\n        allocated: false,\n      };\n    } else {\n      return m.MEMFS.stream_ops._mmap(stream, length, position, prot, flags);\n    }\n  };\n  m.MEMFS.ops_table.file.stream.mmap = m.MEMFS.stream_ops.mmap;\n\n  // mount FS\n  m.FS.mkdir('/models');\n  m.FS.mount(m.MEMFS, { root: '.' }, '/models');\n};\n\n// Allocate a new file in wllama heapfs, returns file ID\nconst heapfsAlloc = (name, size, allocBuffer) => {\n  if (size < 1) {\n    throw new Error('File size must be bigger than 0');\n  }\n  const m = Module;\n  const ptr = toSizeT(allocBuffer ? m.mmapAlloc(size) : 0);\n  const file = {\n    ptr: ptr,\n    size: size,\n    id: currFileId++,\n  };\n  fsIdToFile[file.id] = file;\n  fsNameToFile[name] = file;\n  return file.id;\n};\n\n// Add new file to wllama heapfs, return number of written bytes\nconst heapfsWrite = (id, buffer, offset) => {\n  if (fsIdToFile[id]) {\n    const { ptr, size } = fsIdToFile[id];\n    const afterWriteByte = offset + buffer.byteLength;\n    if (afterWriteByte > size) {\n      throw new Error(\n        `File ID ${id} write out of bound, afterWriteByte = ${afterWriteByte} while size = ${size}`\n      );\n    }\n    getHeapU8().set(buffer, Number(ptr) + offset);\n    return buffer.byteLength;\n  } else {\n    throw new Error(`File ID ${id} not found in heapfs`);\n  }\n};\n\n//////////////////////////////////////////////////////////////\n// ASYNC FILE READ\n//////////////////////////////////////////////////////////////\n\nlet isAwaitReading = false;\nlet pendingReadPromise = null;\nlet pendingReadResolve = null;\nlet pendingReadReject = null;\n\nconst _stripModelsPrefix = (path) => path.replace(/^\\/?models\\//, '');\n\n// Called from EM_ASYNC_JS stub in wllama-fs.h (path is already a JS string)\nconst _wllama_js_file_read = async (path, offset, req_size, out_ptr) => {\n  const name = _stripModelsPrefix(path);\n\n  pendingReadPromise = new Promise((res, rej) => {\n    pendingReadResolve = res;\n    pendingReadReject = rej;\n  });\n  isAwaitReading = true;\n\n  postMessage({ verb: 'fs.read_req', args: [name, offset, req_size] });\n\n  let data;\n  try {\n    data = await pendingReadPromise;\n  } finally {\n    isAwaitReading = false;\n    pendingReadResolve = null;\n    pendingReadReject = null;\n  }\n\n  const bytes = new Uint8Array(data);\n  getHeapU8().set(bytes, out_ptr);\n  return toSizeT(bytes.length);\n};\n\n//////////////////////////////////////////////////////////////\n// MAIN CODE\n//////////////////////////////////////////////////////////////\n\nconst callWrapper = (name, ret, args, isAsync) => {\n  const fn = Module.cwrap(\n    name,\n    ret,\n    args,\n    isAsync ? { async: true } : undefined\n  );\n  return async (action, req) => {\n    // console.log(`Calling ${name} with action:`, action, 'and req:', req);\n    let result;\n    try {\n      if (args.length === 2) {\n        result = isAsync ? await fn(action, req) : fn(action, req);\n      } else {\n        result = fn();\n      }\n    } catch (ex) {\n      console.error(ex);\n      throw ex;\n    }\n    return result;\n  };\n};\n\n// re-entering the wasm while a call is suspended (JSPI / asyncify) corrupts its state, so only one call runs at a time and the rest wait in the queue\nlet wasmCallBusy = false;\nconst wasmCallQueue = [];\n\nconst runWasmCall = async (callbackId, fn) => {\n  if (isAborted) {\n    // the wasm is dead, fail fast instead of calling into it\n    msg({ callbackId, err: 'wllama has crashed, please reload the module' });\n    return;\n  }\n  if (wasmCallBusy) {\n    wasmCallQueue.push({ callbackId, fn });\n    return;\n  }\n  wasmCallBusy = true;\n  try {\n    await fn();\n  } finally {\n    wasmCallBusy = false;\n    if (isAborted) {\n      // do not touch the wasm again after it aborted; the main thread already rejected the queued tasks\n      wasmCallQueue.length = 0;\n    } else {\n      const next = wasmCallQueue.shift();\n      if (next) runWasmCall(next.callbackId, next.fn);\n    }\n  }\n};\n\nconst runAction = async (data) => {\n  const { args, callbackId } = data;\n  const argAction = args[0];\n  const argEncodedMsg = args[1];\n  try {\n    const inputPtr = await wllamaMalloc(toSizeT(argEncodedMsg.byteLength), 0);\n    // copy data to wasm heap\n    const inputBuffer = new Uint8Array(\n      getHeapU8().buffer,\n      Number(inputPtr),\n      argEncodedMsg.byteLength\n    );\n    inputBuffer.set(argEncodedMsg, 0);\n    const outputPtr = await wllamaAction(argAction, inputPtr);\n    // length of output buffer is written at the first 4 bytes of input buffer\n    const outputLen = new Uint32Array(\n      getHeapU8().buffer,\n      Number(inputPtr),\n      1\n    )[0];\n    // copy the output buffer to JS heap\n    const outputBuffer = new Uint8Array(outputLen);\n    const outputSrcView = new Uint8Array(\n      getHeapU8().buffer,\n      Number(outputPtr),\n      outputLen\n    );\n    outputBuffer.set(outputSrcView, 0); // copy it\n    msg({ callbackId, result: outputBuffer }, [outputBuffer.buffer]);\n  } catch (err) {\n    handleError(err);\n  }\n};\n\nfunction handleError(err) {\n  // If WASM already aborted, onAbort already sent signal.abort; skip to avoid\n  // re-reporting the resulting WebAssembly.RuntimeError as a JS exception.\n  if (isAborted) return;\n\n  const message = err ? err.message || String(err) : 'Unknown error';\n  const stack = err ? err.stack || String(err) : '';\n  msg({\n    verb: 'signal.abort',\n    args: ['exception', message, stack, err],\n  });\n}\n\nonmessage = async (e) => {\n  if (!e.data) return;\n  const { verb, args, callbackId } = e.data;\n\n  // fs.read_res arrives while wasm is JSPI-suspended; resolve the pending promise.\n  if (verb === 'fs.read_res') {\n    if (pendingReadResolve) {\n      pendingReadResolve(args[0]);\n    }\n    return;\n  }\n\n  // Guard: while awaiting a file read, reject any other incoming task.\n  if (isAwaitReading) {\n    if (callbackId) {\n      msg({\n        callbackId,\n        err: 'Worker is suspended waiting for file data (JSPI)',\n      });\n    }\n    return;\n  }\n\n  if (!callbackId) {\n    msg({ verb: 'console.error', args: ['callbackId is required', e.data] });\n    return;\n  }\n\n  if (verb === 'module.init') {\n    const argMainScriptBlob = args[0];\n    const argUseAsyncFile = args[1];\n    try {\n      Module = getWModuleConfig(argMainScriptBlob);\n      Module.preRun = () => {\n        if (argUseAsyncFile) {\n          Module.ENV['USE_ASYNC_FILE'] = '1';\n        }\n      };\n      Module.onRuntimeInitialized = () => {\n        // async call once module is ready\n        // init FS\n        patchHeapFS();\n        // init cwrap\n        const pointer = isCompat ? 'number' : 'bigint';\n        // TODO: note sure why emscripten cannot bind if there is only 1 argument\n        wllamaMalloc = callWrapper('wllama_malloc', pointer, [\n          'number',\n          pointer,\n        ]);\n        wllamaStart = callWrapper('wllama_start', 'string', [], true);\n        wllamaAction = callWrapper(\n          'wllama_action',\n          pointer,\n          ['string', pointer],\n          true\n        );\n        wllamaExit = callWrapper('wllama_exit', 'string', []);\n        wllamaDebug = callWrapper('wllama_debug', 'string', []);\n        msg({ callbackId, result: null });\n      };\n      wModuleInit();\n    } catch (err) {\n      handleError(err);\n    }\n    return;\n  }\n\n  if (verb === 'fs.alloc') {\n    const argFilename = args[0];\n    const argSize = args[1];\n    const argAllocBuffer = args[2];\n    try {\n      // create blank file\n      const emptyBuffer = new ArrayBuffer(0);\n      Module['FS_createDataFile'](\n        '/models',\n        argFilename,\n        emptyBuffer,\n        true,\n        true,\n        true\n      );\n      // alloc data on heap\n      const fileId = heapfsAlloc(argFilename, argSize, argAllocBuffer);\n      msg({ callbackId, result: { fileId } });\n    } catch (err) {\n      handleError(err);\n    }\n    return;\n  }\n\n  if (verb === 'fs.write') {\n    const argFileId = args[0];\n    const argBuffer = args[1];\n    const argOffset = args[2];\n    try {\n      const writtenBytes = heapfsWrite(argFileId, argBuffer, argOffset);\n      msg({ callbackId, result: { writtenBytes } });\n    } catch (err) {\n      handleError(err);\n    }\n    return;\n  }\n\n  if (verb === 'wllama.start') {\n    await runWasmCall(callbackId, async () => {\n      try {\n        const result = await wllamaStart();\n        msg({ callbackId, result });\n      } catch (err) {\n        handleError(err);\n      }\n    });\n    return;\n  }\n\n  if (verb === 'wllama.action') {\n    await runWasmCall(callbackId, () => runAction(e.data));\n    return;\n  }\n\n  if (verb === 'wllama.exit') {\n    await runWasmCall(callbackId, async () => {\n      try {\n        const result = await wllamaExit();\n        msg({ callbackId, result });\n      } catch (err) {\n        handleError(err);\n      }\n    });\n    return;\n  }\n\n  if (verb === 'wllama.debug') {\n    await runWasmCall(callbackId, async () => {\n      try {\n        const result = await wllamaDebug();\n        msg({ callbackId, result });\n      } catch (err) {\n        handleError(err);\n      }\n    });\n    return;\n  }\n};\n";
var OPFS_UTILS_WORKER_CODE = "let accessHandle;\nlet abortController = new AbortController();\n\nasync function openFile(filename) {\n  const opfsRoot = await navigator.storage.getDirectory();\n  const cacheDir = await opfsRoot.getDirectoryHandle('cache', { create: true });\n  const fileHandler = await cacheDir.getFileHandle(filename, { create: true });\n  accessHandle = await fileHandler.createSyncAccessHandle();\n  accessHandle.truncate(0); // clear file content\n}\n\nasync function writeFile(buf) {\n  accessHandle.write(buf);\n}\n\nasync function closeFile() {\n  accessHandle.flush();\n  accessHandle.close();\n}\n\nasync function writeTextFile(filename, str) {\n  await openFile(filename);\n  await writeFile(new TextEncoder().encode(str));\n  await closeFile();\n}\n\nconst throttled = (func, delay) => {\n  let lastRun = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - lastRun > delay) {\n      lastRun = now;\n      func.apply(null, args);\n    }\n  };\n};\n\nconst assertNonNull = (val) => {\n  if (val === null || val === undefined) {\n    throw new Error('OPFS Worker: Assertion failed');\n  }\n};\n\n// respond to main thread\nconst resOK = () => postMessage({ ok: true });\nconst resProgress = (loaded, total) =>\n  postMessage({ progress: { loaded, total } });\nconst resErr = (err) => postMessage({ err });\n\nonmessage = async (e) => {\n  try {\n    if (!e.data) return;\n\n    /**\n     * @param {Object} e.data\n     *\n     * Fine-control FS actions:\n     * - { action: 'open', filename: 'string' }\n     * - { action: 'write', buf: ArrayBuffer }\n     * - { action: 'close' }\n     *\n     * Simple write API:\n     * - { action: 'write-simple', filename: 'string', buf: ArrayBuffer }\n     *\n     * Download API:\n     * - { action: 'download', url: 'string', filename: 'string', options: Object, metadataFileName: 'string' }\n     * - { action: 'download-abort' }\n     */\n    const {\n      action,\n      filename,\n      buf,\n      url,\n      options,\n      metadataFileName,\n      metadataAdditional,\n    } = e.data;\n\n    if (action === 'open') {\n      assertNonNull(filename);\n      await openFile(filename);\n      return resOK();\n    } else if (action === 'write') {\n      assertNonNull(buf);\n      await writeFile(buf);\n      return resOK();\n    } else if (action === 'close') {\n      await closeFile();\n      return resOK();\n    } else if (action === 'write-simple') {\n      assertNonNull(filename);\n      assertNonNull(buf);\n      await openFile(filename);\n      await writeFile(buf);\n      await closeFile();\n      return resOK();\n    } else if (action === 'download') {\n      assertNonNull(url);\n      assertNonNull(filename);\n      assertNonNull(metadataFileName);\n      assertNonNull(options);\n      assertNonNull(options.aborted);\n      abortController = new AbortController();\n      if (options.aborted) abortController.abort();\n      const response = await fetch(url, {\n        ...options,\n        signal: abortController.signal,\n      });\n      const contentLength = response.headers.get('content-length');\n      const etag = (response.headers.get('etag') || '').replace(\n        /[^A-Za-z0-9]/g,\n        ''\n      );\n      const total = parseInt(contentLength, 10);\n      const reader = response.body.getReader();\n      await openFile(filename);\n      let loaded = 0;\n      const throttledProgress = throttled(resProgress, 100);\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) break;\n        loaded += value.byteLength;\n        await writeFile(value);\n        throttledProgress(loaded, total);\n      }\n      resProgress(total, total); // 100% done\n      await closeFile();\n      // make sure this is in-sync with CacheEntryMetadata\n      await writeTextFile(\n        metadataFileName,\n        JSON.stringify({\n          originalURL: url,\n          originalSize: total,\n          etag,\n          ...metadataAdditional,\n        })\n      );\n      return resOK();\n    } else if (action === 'download-abort') {\n      if (abortController) {\n        abortController.abort();\n      }\n      return;\n    }\n\n    throw new Error('OPFS Worker: Invalid action', e.data);\n  } catch (err) {\n    return resErr(err);\n  }\n};\n";
var WLLAMA_EMSCRIPTEN_CODE = 'var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;var ENVIRONMENT_IS_NODE=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";var ENVIRONMENT_IS_PTHREAD=ENVIRONMENT_IS_WORKER&&self.name?.startsWith("em-pthread");if(ENVIRONMENT_IS_NODE){var worker_threads=require("worker_threads");global.Worker=worker_threads.Worker;ENVIRONMENT_IS_WORKER=!worker_threads.isMainThread;ENVIRONMENT_IS_PTHREAD=ENVIRONMENT_IS_WORKER&&worker_threads["workerData"]=="em-pthread"}var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var _scriptName=globalThis.document?.currentScript?.src;if(typeof __filename!="undefined"){_scriptName=__filename}else if(ENVIRONMENT_IS_WORKER){_scriptName=self.location.href}var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(process.argv.length>1){thisProgram=process.argv[1].replace(/\\\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href}catch{}if(!ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{if(isFileURI(url)){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var defaultPrint=console.log.bind(console);var defaultPrintErr=console.error.bind(console);if(ENVIRONMENT_IS_NODE){var utils=require("util");var stringify=a=>typeof a=="object"?utils.inspect(a):a;defaultPrint=(...args)=>fs.writeSync(1,args.map(stringify).join(" ")+"\\n");defaultPrintErr=(...args)=>fs.writeSync(2,args.map(stringify).join(" ")+"\\n")}var out=defaultPrint;var err=defaultPrintErr;var wasmBinary;var wasmModule;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var isFileURI=filename=>filename.startsWith("file://");function growMemViews(){if(wasmMemory.buffer!=HEAP8.buffer){updateMemoryViews()}}if(ENVIRONMENT_IS_NODE&&ENVIRONMENT_IS_PTHREAD){var parentPort=worker_threads["parentPort"];parentPort.on("message",msg=>global.onmessage?.({data:msg}));Object.assign(globalThis,{self:global,postMessage:msg=>parentPort["postMessage"](msg)});process.on("uncaughtException",err=>{postMessage({cmd:"uncaughtException",error:err});process.exit(1)})}var startWorker;if(ENVIRONMENT_IS_PTHREAD){var initializedJS=false;self.onunhandledrejection=e=>{throw e.reason||e};async function handleMessage(e){try{var msgData=e["data"];var cmd=msgData.cmd;if(cmd==="load"){let messageQueue=[];self.onmessage=e=>messageQueue.push(e);startWorker=()=>{postMessage({cmd:"loaded"});for(let msg of messageQueue){handleMessage(msg)}self.onmessage=handleMessage};for(const handler of msgData.handlers){if(!Module[handler]||Module[handler].proxy){Module[handler]=(...args)=>{postMessage({cmd:"callHandler",handler,args})};if(handler=="print")out=Module[handler];if(handler=="printErr")err=Module[handler]}}wasmMemory=msgData.wasmMemory;updateMemoryViews();wasmModule=msgData.wasmModule;createWasm();run()}else if(cmd==="run"){establishStackSpace(msgData.pthread_ptr);__emscripten_thread_init(msgData.pthread_ptr,0,0,1,0,0);PThread.threadInitTLS();__emscripten_thread_mailbox_await(msgData.pthread_ptr);if(!initializedJS){initializedJS=true}try{await invokeEntryPoint(msgData.start_routine,msgData.arg)}catch(ex){if(ex!="unwind"){throw ex}}}else if(msgData.target==="setimmediate"){}else if(cmd==="checkMailbox"){if(initializedJS){checkMailbox()}}else if(cmd){err(`worker: received unknown command ${cmd}`);err(msgData)}}catch(ex){__emscripten_thread_crashed();throw ex}}self.onmessage=handleMessage}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var HEAP64,HEAPU64;var runtimeInitialized=false;function updateMemoryViews(){var b=wasmMemory.buffer;HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b);HEAP64=new BigInt64Array(b);HEAPU64=new BigUint64Array(b)}function initMemory(){if(ENVIRONMENT_IS_PTHREAD){return}if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||134217728;wasmMemory=new WebAssembly.Memory({initial:BigInt(INITIAL_MEMORY/65536),maximum:65536n,shared:true,address:"i64"})}updateMemoryViews()}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(onPreRuns)}function initRuntime(){runtimeInitialized=true;if(ENVIRONMENT_IS_PTHREAD)return startWorker();if(!Module["noFSInit"]&&!FS.initialized)FS.init();TTY.init();wasmExports["__wasm_call_ctors"]();FS.ignorePermissions=false}function preMain(){}function postRun(){if(ENVIRONMENT_IS_PTHREAD){return}if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(onPostRuns)}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";if(runtimeInitialized){___trap()}var e=new WebAssembly.RuntimeError(what);throw e}var wasmBinaryFile;function findWasmBinary(){return locateFile("wllama.wasm")}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){assignWasmImports();if(!wasmImports.__instrumented){wasmImports.__instrumented=true;Asyncify.instrumentWasmImports(wasmImports)}var imports={env:wasmImports,wasi_snapshot_preview1:wasmImports};return imports}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmExports=Asyncify.instrumentWasmExports(wasmExports);wasmExports=applySignatureConversions(wasmExports);registerTLSInit(wasmExports["_emscripten_tls_init"]);assignWasmExports(wasmExports);wasmModule=module;removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){return receiveInstance(result["instance"],result["module"])}var info=getWasmImports();if(Module["instantiateWasm"]){return new Promise((resolve,reject)=>{Module["instantiateWasm"](info,(inst,mod)=>{resolve(receiveInstance(inst,mod))})})}if(ENVIRONMENT_IS_PTHREAD){var instance=new WebAssembly.Instance(wasmModule,getWasmImports());return receiveInstance(instance,wasmModule)}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);var exports=receiveInstantiationResult(result);return exports}class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var terminateWorker=worker=>{worker.terminate();worker.onmessage=e=>{}};var cleanupThread=pthread_ptr=>{var worker=PThread.pthreads[pthread_ptr];PThread.returnWorkerToPool(worker)};var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var onPreRuns=[];var addOnPreRun=cb=>onPreRuns.push(cb);var runDependencies=0;var dependenciesFulfilled=null;var removeRunDependency=id=>{runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}};var addRunDependency=id=>{runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)};var spawnThread=threadParams=>{var worker=PThread.getNewWorker();if(!worker){return 6}PThread.runningWorkers.push(worker);PThread.pthreads[threadParams.pthread_ptr]=worker;worker.pthread_ptr=threadParams.pthread_ptr;var msg={cmd:"run",start_routine:threadParams.startRoutine,arg:threadParams.arg,pthread_ptr:threadParams.pthread_ptr};if(ENVIRONMENT_IS_NODE){worker.unref()}worker.postMessage(msg,threadParams.transferList);return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var stackSave=()=>_emscripten_stack_get_current();var stackRestore=val=>__emscripten_stack_restore(val);var stackAlloc=sz=>__emscripten_stack_alloc(sz);var proxyToMainThread=(funcIndex,emAsmAddr,sync,...callArgs)=>{var serializedNumCallArgs=callArgs.length*2;var sp=stackSave();var args=stackAlloc(serializedNumCallArgs*8);var b=args/8;for(var i=0;i<callArgs.length;i++){var arg=callArgs[i];if(typeof arg=="bigint"){(growMemViews(),HEAP64)[b+2*i]=1n;(growMemViews(),HEAP64)[b+2*i+1]=arg}else{(growMemViews(),HEAP64)[b+2*i]=0n;(growMemViews(),HEAPF64)[b+2*i+1]=arg}}var rtn=__emscripten_run_js_on_main_thread(funcIndex,emAsmAddr,serializedNumCallArgs,args,sync);stackRestore(sp);return rtn};function _proc_exit(code){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(0,0,1,code);EXITSTATUS=code;if(!keepRuntimeAlive()){PThread.terminateAllThreads();Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))}function exitOnMainThread(returnCode){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(1,0,0,returnCode);_exit(returnCode)}var exitJS=(status,implicit)=>{EXITSTATUS=status;if(ENVIRONMENT_IS_PTHREAD){exitOnMainThread(status);throw"unwind"}_proc_exit(status)};var _exit=exitJS;var PThread={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init(){if(!ENVIRONMENT_IS_PTHREAD){PThread.initMainThread()}},initMainThread(){var pthreadPoolSize=Module["pthreadPoolSize"];while(pthreadPoolSize--){PThread.allocateUnusedWorker()}addOnPreRun(async()=>{var pthreadPoolReady=PThread.loadWasmModuleToAllWorkers();addRunDependency("loading-workers");await pthreadPoolReady;removeRunDependency("loading-workers")})},terminateAllThreads:()=>{for(var worker of PThread.runningWorkers){terminateWorker(worker)}for(var worker of PThread.unusedWorkers){terminateWorker(worker)}PThread.unusedWorkers=[];PThread.runningWorkers=[];PThread.pthreads={}},returnWorkerToPool:worker=>{var pthread_ptr=worker.pthread_ptr;delete PThread.pthreads[pthread_ptr];PThread.unusedWorkers.push(worker);PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker),1);worker.pthread_ptr=0;__emscripten_thread_free_data(pthread_ptr)},threadInitTLS(){PThread.tlsInitFunctions.forEach(f=>f())},loadWasmModuleToWorker:worker=>new Promise(onFinishedLoading=>{worker.onmessage=e=>{var d=e["data"];var cmd=d.cmd;if(d.targetThread&&d.targetThread!=_pthread_self()){var targetWorker=PThread.pthreads[d.targetThread];if(targetWorker){targetWorker.postMessage(d,d.transferList)}else{err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d.targetThread}, but that thread no longer exists!`)}return}if(cmd==="checkMailbox"){checkMailbox()}else if(cmd==="spawnThread"){spawnThread(d)}else if(cmd==="cleanupThread"){callUserCallback(()=>cleanupThread(d.thread))}else if(cmd==="loaded"){worker.loaded=true;if(ENVIRONMENT_IS_NODE&&!worker.pthread_ptr){worker.unref()}onFinishedLoading(worker)}else if(d.target==="setimmediate"){worker.postMessage(d)}else if(cmd==="uncaughtException"){worker.onerror(d.error)}else if(cmd==="callHandler"){Module[d.handler](...d.args)}else if(cmd){err(`worker sent an unknown command ${cmd}`)}};worker.onerror=e=>{var message="worker sent an error!";err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);throw e};if(ENVIRONMENT_IS_NODE){worker.on("message",data=>worker.onmessage({data}));worker.on("error",e=>worker.onerror(e))}var handlers=[];var knownHandlers=["onExit","onAbort","print","printErr"];for(var handler of knownHandlers){if(Module.propertyIsEnumerable(handler)){handlers.push(handler)}}worker.postMessage({cmd:"load",handlers,wasmMemory,wasmModule})}),async loadWasmModuleToAllWorkers(){if(ENVIRONMENT_IS_PTHREAD){return}let pthreadPoolReady=Promise.all(PThread.unusedWorkers.map(PThread.loadWasmModuleToWorker));return pthreadPoolReady},allocateUnusedWorker(){var worker;var pthreadMainJs=_scriptName;if(Module["mainScriptUrlOrBlob"]){pthreadMainJs=Module["mainScriptUrlOrBlob"];if(typeof pthreadMainJs!="string"){pthreadMainJs=URL.createObjectURL(pthreadMainJs)}}worker=new Worker(pthreadMainJs,{workerData:"em-pthread",name:"em-pthread"});PThread.unusedWorkers.push(worker)},getNewWorker(){if(PThread.unusedWorkers.length==0){PThread.allocateUnusedWorker();PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0])}return PThread.unusedWorkers.pop()}};var onPostRuns=[];var addOnPostRun=cb=>onPostRuns.push(cb);function establishStackSpace(pthread_ptr){var stackHigh=Number((growMemViews(),HEAPU64)[(pthread_ptr+88)/8]);var stackSize=Number((growMemViews(),HEAPU64)[(pthread_ptr+96)/8]);var stackLow=stackHigh-stackSize;_emscripten_stack_set_limits(stackHigh,stackLow);stackRestore(stackHigh)}var wasmTableMirror=[];var getWasmTableEntry=funcPtr=>{funcPtr=Number(funcPtr);var func=wasmTableMirror[funcPtr];if(!func){wasmTableMirror[funcPtr]=func=wasmTable.get(BigInt(funcPtr));if(Asyncify.isAsyncExport(func)){wasmTableMirror[funcPtr]=func=Asyncify.makeAsyncFunction(func)}}return func};var invokeEntryPoint=async(ptr,arg)=>{runtimeKeepaliveCounter=0;noExitRuntime=0;var result=(a1=>WebAssembly.promising(getWasmTableEntry(ptr)).call(null,BigInt(a1)))(arg);function finish(result){if(keepRuntimeAlive()){EXITSTATUS=result;return}__emscripten_thread_exit(result)}result=await result;finish(result)};invokeEntryPoint.isAsync=true;var noExitRuntime=true;var registerTLSInit=tlsInitFunc=>PThread.tlsInitFunctions.push(tlsInitFunc);var wasmMemory;function pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(2,0,1,pthread_ptr,attr,startRoutine,arg);return ___pthread_create_js(pthread_ptr,attr,startRoutine,arg)}var _emscripten_has_threading_support=()=>!!globalThis.SharedArrayBuffer;var INT53_MAX=9007199254740992;var INT53_MIN=-9007199254740992;var bigintToI53Checked=num=>num<INT53_MIN||num>INT53_MAX?NaN:Number(num);function ___pthread_create_js(pthread_ptr,attr,startRoutine,arg){pthread_ptr=bigintToI53Checked(pthread_ptr);attr=bigintToI53Checked(attr);startRoutine=bigintToI53Checked(startRoutine);arg=bigintToI53Checked(arg);if(!_emscripten_has_threading_support()){return 6}var transferList=[];var error=0;if(ENVIRONMENT_IS_PTHREAD&&(transferList.length===0||error)){return pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg)}if(error)return error;var threadParams={startRoutine,pthread_ptr,arg,transferList};if(ENVIRONMENT_IS_PTHREAD){threadParams.cmd="spawnThread";postMessage(threadParams,transferList);return 0}return spawnThread(threadParams)}var syscallGetVarargP=()=>{var ret=Number((growMemViews(),HEAPU64)[SYSCALLS.varargs/8]);SYSCALLS.varargs+=8;return ret};var syscallGetVarargI=()=>{var ret=(growMemViews(),HEAP32)[+SYSCALLS.varargs/4];SYSCALLS.varargs+=4;return ret};var PATH={isAbs:path=>path.charAt(0)==="/",splitPath:filename=>{var splitPathRe=/^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:(parts,allowAboveRoot)=>{var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:path=>{var isAbsolute=PATH.isAbs(path),trailingSlash=path.slice(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(p=>!!p),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:path=>{var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.slice(0,-1)}return root+dir},basename:path=>path&&path.match(/([^\\/]+|\\/)\\/*$/)[1],join:(...paths)=>PATH.normalize(paths.join("/")),join2:(l,r)=>PATH.normalize(l+"/"+r)};var initRandomFill=()=>view=>view.set(crypto.getRandomValues(new Uint8Array(view.byteLength)));var randomFill=view=>{(randomFill=initRandomFill())(view)};var PATH_FS={resolve:(...args)=>{var resolvedPath="",resolvedAbsolute=false;for(var i=args.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?args[i]:FS.cwd();if(typeof path!="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=PATH.isAbs(path)}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(p=>!!p),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."},relative:(from,to)=>{from=PATH_FS.resolve(from).slice(1);to=PATH_FS.resolve(to).slice(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")}};var UTF8Decoder=globalThis.TextDecoder&&new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead,ignoreNul)=>{var endPtr=findStringEnd(heapOrArray,idx,maxBytesToRead,ignoreNul);if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.buffer instanceof ArrayBuffer?heapOrArray.subarray(idx,endPtr):heapOrArray.slice(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var FS_stdin_getChar_buffer=[];var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;i++}}heap[outIdx]=0;return outIdx-startIdx};var intArrayFromString=(stringy,dontAddNull,length)=>{var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array};var FS_stdin_getChar=()=>{if(!FS_stdin_getChar_buffer.length){var result=null;if(ENVIRONMENT_IS_NODE){var BUFSIZE=256;var buf=Buffer.alloc(BUFSIZE);var bytesRead=0;var fd=process.stdin.fd;try{bytesRead=fs.readSync(fd,buf,0,BUFSIZE)}catch(e){if(e.toString().includes("EOF"))bytesRead=0;else throw e}if(bytesRead>0){result=buf.slice(0,bytesRead).toString("utf-8")}}else if(globalThis.window?.prompt){result=window.prompt("Input: ");if(result!==null){result+="\\n"}}else{}if(!result){return null}FS_stdin_getChar_buffer=intArrayFromString(result,true)}return FS_stdin_getChar_buffer.shift()};var TTY={ttys:[],init(){},shutdown(){},register(dev,ops){TTY.ttys[dev]={input:[],output:[],ops};FS.registerDevice(dev,TTY.stream_ops)},stream_ops:{open(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(43)}stream.tty=tty;stream.seekable=false},close(stream){stream.tty.ops.fsync(stream.tty)},fsync(stream){stream.tty.ops.fsync(stream.tty)},read(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(60)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.atime=Date.now()}return bytesRead},write(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(60)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i])}}catch(e){throw new FS.ErrnoError(29)}if(length){stream.node.mtime=stream.node.ctime=Date.now()}return i}},default_tty_ops:{get_char(tty){return FS_stdin_getChar()},put_char(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output));tty.output=[]}else{if(val!=0)tty.output.push(val)}},fsync(tty){if(tty.output?.length>0){out(UTF8ArrayToString(tty.output));tty.output=[]}},ioctl_tcgets(tty){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets(tty,optional_actions,data){return 0},ioctl_tiocgwinsz(tty){return[24,80]}},default_tty1_ops:{put_char(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output));tty.output=[]}else{if(val!=0)tty.output.push(val)}},fsync(tty){if(tty.output?.length>0){err(UTF8ArrayToString(tty.output));tty.output=[]}}}};var zeroMemory=(ptr,size)=>(growMemViews(),HEAPU8).fill(0,ptr,ptr+size);var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var mmapAlloc=size=>{size=alignMemory(size,65536);var ptr=_emscripten_builtin_memalign(65536,size);if(ptr)zeroMemory(ptr,size);return ptr};var MEMFS={ops_table:null,mount(mount){return MEMFS.createNode(null,"/",16895,0)},createNode(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(63)}MEMFS.ops_table||={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}};var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.atime=node.mtime=node.ctime=Date.now();if(parent){parent.contents[name]=node;parent.atime=parent.mtime=parent.ctime=node.atime}return node},getFileDataAsTypedArray(node){if(!node.contents)return new Uint8Array(0);if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)},expandFileStorage(node,newCapacity){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)>>>0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0)},resizeFileStorage(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0}else{var oldContents=node.contents;node.contents=new Uint8Array(newSize);if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize}},node_ops:{getattr(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.atime);attr.mtime=new Date(node.mtime);attr.ctime=new Date(node.ctime);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr},setattr(node,attr){for(const key of["mode","atime","mtime","ctime"]){if(attr[key]!=null){node[key]=attr[key]}}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}},lookup(parent,name){if(!MEMFS.doesNotExistError){MEMFS.doesNotExistError=new FS.ErrnoError(44);MEMFS.doesNotExistError.stack="<generic error, no stack>"}throw MEMFS.doesNotExistError},mknod(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)},rename(old_node,new_dir,new_name){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){if(FS.isDir(old_node.mode)){for(var i in new_node.contents){throw new FS.ErrnoError(55)}}FS.hashRemoveNode(new_node)}delete old_node.parent.contents[old_node.name];new_dir.contents[new_name]=old_node;old_node.name=new_name;new_dir.ctime=new_dir.mtime=old_node.parent.ctime=old_node.parent.mtime=Date.now()},unlink(parent,name){delete parent.contents[name];parent.ctime=parent.mtime=Date.now()},rmdir(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(55)}delete parent.contents[name];parent.ctime=parent.mtime=Date.now()},readdir(node){return[".","..",...Object.keys(node.contents)]},symlink(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node},readlink(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(28)}return node.link}},stream_ops:{read(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size},write(stream,buffer,offset,length,position,canOwn){if(buffer.buffer===(growMemViews(),HEAP8).buffer){canOwn=false}if(!length)return 0;var node=stream.node;node.mtime=node.ctime=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=buffer.slice(offset,offset+length);node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray){node.contents.set(buffer.subarray(offset,offset+length),position)}else{for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}}node.usedBytes=Math.max(node.usedBytes,position+length);return length},llseek(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(28)}return position},mmap(stream,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&contents&&contents.buffer===(growMemViews(),HEAP8).buffer){allocated=false;ptr=contents.byteOffset}else{allocated=true;ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}if(contents){if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}(growMemViews(),HEAP8).set(contents,ptr)}}return{ptr,allocated}},msync(stream,buffer,offset,length,mmapFlags){MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};var FS_modeStringToFlags=str=>{var flagModes={r:0,"r+":2,w:512|64|1,"w+":512|64|2,a:1024|64|1,"a+":1024|64|2};var flags=flagModes[str];if(typeof flags=="undefined"){throw new Error(`Unknown file open mode: ${str}`)}return flags};var FS_getMode=(canRead,canWrite)=>{var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode};var asyncLoad=async url=>{var arrayBuffer=await readAsync(url);return new Uint8Array(arrayBuffer)};var FS_createDataFile=(...args)=>FS.createDataFile(...args);var getUniqueRunDependency=id=>id;var preloadPlugins=[];var FS_handledByPreloadPlugin=async(byteArray,fullname)=>{if(typeof Browser!="undefined")Browser.init();for(var plugin of preloadPlugins){if(plugin["canHandle"](fullname)){return plugin["handle"](byteArray,fullname)}}return byteArray};var FS_preloadFile=async(parent,name,url,canRead,canWrite,dontCreateFile,canOwn,preFinish)=>{var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;var dep=getUniqueRunDependency(`cp ${fullname}`);addRunDependency(dep);try{var byteArray=url;if(typeof url=="string"){byteArray=await asyncLoad(url)}byteArray=await FS_handledByPreloadPlugin(byteArray,fullname);preFinish?.();if(!dontCreateFile){FS_createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}}finally{removeRunDependency(dep)}};var FS_createPreloadedFile=(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish)=>{FS_preloadFile(parent,name,url,canRead,canWrite,dontCreateFile,canOwn,preFinish).then(onload).catch(onerror)};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,filesystems:null,syncFSRequests:0,readFiles:{},ErrnoError:class{name="ErrnoError";constructor(errno){this.errno=errno}},FSStream:class{shared={};get object(){return this.node}set object(val){this.node=val}get isRead(){return(this.flags&2097155)!==1}get isWrite(){return(this.flags&2097155)!==0}get isAppend(){return this.flags&1024}get flags(){return this.shared.flags}set flags(val){this.shared.flags=val}get position(){return this.shared.position}set position(val){this.shared.position=val}},FSNode:class{node_ops={};stream_ops={};readMode=292|73;writeMode=146;mounted=null;constructor(parent,name,mode,rdev){if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.rdev=rdev;this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(val){val?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(val){val?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return FS.isDir(this.mode)}get isDevice(){return FS.isChrdev(this.mode)}},lookupPath(path,opts={}){if(!path){throw new FS.ErrnoError(44)}opts.follow_mount??=true;if(!PATH.isAbs(path)){path=FS.cwd()+"/"+path}linkloop:for(var nlinks=0;nlinks<40;nlinks++){var parts=path.split("/").filter(p=>!!p);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}if(parts[i]==="."){continue}if(parts[i]===".."){current_path=PATH.dirname(current_path);if(FS.isRoot(current)){path=current_path+"/"+parts.slice(i+1).join("/");nlinks--;continue linkloop}else{current=current.parent}continue}current_path=PATH.join2(current_path,parts[i]);try{current=FS.lookupNode(current,parts[i])}catch(e){if(e?.errno===44&&islast&&opts.noent_okay){return{path:current_path}}throw e}if(FS.isMountpoint(current)&&(!islast||opts.follow_mount)){current=current.mounted.root}if(FS.isLink(current.mode)&&(!islast||opts.follow)){if(!current.node_ops.readlink){throw new FS.ErrnoError(52)}var link=current.node_ops.readlink(current);if(!PATH.isAbs(link)){link=PATH.dirname(current_path)+"/"+link}path=link+"/"+parts.slice(i+1).join("/");continue linkloop}}return{path:current_path,node:current}}throw new FS.ErrnoError(32)},getPath(node){var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?`${mount}/${path}`:mount+path}path=path?`${node.name}/${path}`:node.name;node=node.parent}},hashName(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length},hashAddNode(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node},hashRemoveNode(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}},lookupNode(parent,name){var errCode=FS.mayLookup(parent);if(errCode){throw new FS.ErrnoError(errCode)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)},createNode(parent,name,mode,rdev){var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node},destroyNode(node){FS.hashRemoveNode(node)},isRoot(node){return node===node.parent},isMountpoint(node){return!!node.mounted},isFile(mode){return(mode&61440)===32768},isDir(mode){return(mode&61440)===16384},isLink(mode){return(mode&61440)===40960},isChrdev(mode){return(mode&61440)===8192},isBlkdev(mode){return(mode&61440)===24576},isFIFO(mode){return(mode&61440)===4096},isSocket(mode){return(mode&49152)===49152},flagsToPermissionString(flag){var perms=["r","w","rw"][flag&3];if(flag&512){perms+="w"}return perms},nodePermissions(node,perms){if(FS.ignorePermissions){return 0}if(perms.includes("r")&&!(node.mode&292)){return 2}else if(perms.includes("w")&&!(node.mode&146)){return 2}else if(perms.includes("x")&&!(node.mode&73)){return 2}return 0},mayLookup(dir){if(!FS.isDir(dir.mode))return 54;var errCode=FS.nodePermissions(dir,"x");if(errCode)return errCode;if(!dir.node_ops.lookup)return 2;return 0},mayCreate(dir,name){if(!FS.isDir(dir.mode)){return 54}try{var node=FS.lookupNode(dir,name);return 20}catch(e){}return FS.nodePermissions(dir,"wx")},mayDelete(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var errCode=FS.nodePermissions(dir,"wx");if(errCode){return errCode}if(isdir){if(!FS.isDir(node.mode)){return 54}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 10}}else{if(FS.isDir(node.mode)){return 31}}return 0},mayOpen(node,flags){if(!node){return 44}if(FS.isLink(node.mode)){return 32}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!=="r"||flags&(512|64)){return 31}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))},checkOpExists(op,err){if(!op){throw new FS.ErrnoError(err)}return op},MAX_OPEN_FDS:4096,nextfd(){for(var fd=0;fd<=FS.MAX_OPEN_FDS;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(33)},getStreamChecked(fd){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}return stream},getStream:fd=>FS.streams[fd],createStream(stream,fd=-1){stream=Object.assign(new FS.FSStream,stream);if(fd==-1){fd=FS.nextfd()}stream.fd=fd;FS.streams[fd]=stream;return stream},closeStream(fd){FS.streams[fd]=null},dupStream(origStream,fd=-1){var stream=FS.createStream(origStream,fd);stream.stream_ops?.dup?.(stream);return stream},doSetAttr(stream,node,attr){var setattr=stream?.stream_ops.setattr;var arg=setattr?stream:node;setattr??=node.node_ops.setattr;FS.checkOpExists(setattr,63);setattr(arg,attr)},chrdev_stream_ops:{open(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;stream.stream_ops.open?.(stream)},llseek(){throw new FS.ErrnoError(70)}},major:dev=>dev>>8,minor:dev=>dev&255,makedev:(ma,mi)=>ma<<8|mi,registerDevice(dev,ops){FS.devices[dev]={stream_ops:ops}},getDevice:dev=>FS.devices[dev],getMounts(mount){var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push(...m.mounts)}return mounts},syncfs(populate,callback){if(typeof populate=="function"){callback=populate;populate=false}FS.syncFSRequests++;if(FS.syncFSRequests>1){err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`)}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(errCode){FS.syncFSRequests--;return callback(errCode)}function done(errCode){if(errCode){if(!done.errored){done.errored=true;return doCallback(errCode)}return}if(++completed>=mounts.length){doCallback(null)}}for(var mount of mounts){if(mount.type.syncfs){mount.type.syncfs(mount,populate,done)}else{done(null)}}},mount(type,opts,mountpoint){var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(10)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}}var mount={type,opts,mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot},unmount(mountpoint){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(28)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);for(var[hash,current]of Object.entries(FS.nameTable)){while(current){var next=current.name_next;if(mounts.includes(current.mount)){FS.destroyNode(current)}current=next}}node.mounted=null;var idx=node.mount.mounts.indexOf(mount);node.mount.mounts.splice(idx,1)},lookup(parent,name){return parent.node_ops.lookup(parent,name)},mknod(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name){throw new FS.ErrnoError(28)}if(name==="."||name===".."){throw new FS.ErrnoError(20)}var errCode=FS.mayCreate(parent,name);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(63)}return parent.node_ops.mknod(parent,name,mode,dev)},statfs(path){return FS.statfsNode(FS.lookupPath(path,{follow:true}).node)},statfsStream(stream){return FS.statfsNode(stream.node)},statfsNode(node){var rtn={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:FS.nextInode,ffree:FS.nextInode-1,fsid:42,flags:2,namelen:255};if(node.node_ops.statfs){Object.assign(rtn,node.node_ops.statfs(node.mount.opts.root))}return rtn},create(path,mode=438){mode&=4095;mode|=32768;return FS.mknod(path,mode,0)},mkdir(path,mode=511){mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)},mkdirTree(path,mode){var dirs=path.split("/");var d="";for(var dir of dirs){if(!dir)continue;if(d||PATH.isAbs(path))d+="/";d+=dir;try{FS.mkdir(d,mode)}catch(e){if(e.errno!=20)throw e}}},mkdev(path,mode,dev){if(typeof dev=="undefined"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)},symlink(oldpath,newpath){if(!PATH_FS.resolve(oldpath)){throw new FS.ErrnoError(44)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var newname=PATH.basename(newpath);var errCode=FS.mayCreate(parent,newname);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(63)}return parent.node_ops.symlink(parent,newname,oldpath)},rename(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;if(!old_dir||!new_dir)throw new FS.ErrnoError(44);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(75)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH_FS.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(28)}relative=PATH_FS.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(55)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var errCode=FS.mayDelete(old_dir,old_name,isdir);if(errCode){throw new FS.ErrnoError(errCode)}errCode=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(errCode){throw new FS.ErrnoError(errCode)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(63)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(10)}if(new_dir!==old_dir){errCode=FS.nodePermissions(old_dir,"w");if(errCode){throw new FS.ErrnoError(errCode)}}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name);old_node.parent=new_dir}catch(e){throw e}finally{FS.hashAddNode(old_node)}},rmdir(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,true);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node)},readdir(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;var readdir=FS.checkOpExists(node.node_ops.readdir,54);return readdir(node)},unlink(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,false);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.unlink(parent,name);FS.destroyNode(node)},readlink(path){var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(44)}if(!link.node_ops.readlink){throw new FS.ErrnoError(28)}return link.node_ops.readlink(link)},stat(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;var getattr=FS.checkOpExists(node.node_ops.getattr,63);return getattr(node)},fstat(fd){var stream=FS.getStreamChecked(fd);var node=stream.node;var getattr=stream.stream_ops.getattr;var arg=getattr?stream:node;getattr??=node.node_ops.getattr;FS.checkOpExists(getattr,63);return getattr(arg)},lstat(path){return FS.stat(path,true)},doChmod(stream,node,mode,dontFollow){FS.doSetAttr(stream,node,{mode:mode&4095|node.mode&~4095,ctime:Date.now(),dontFollow})},chmod(path,mode,dontFollow){var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}FS.doChmod(null,node,mode,dontFollow)},lchmod(path,mode){FS.chmod(path,mode,true)},fchmod(fd,mode){var stream=FS.getStreamChecked(fd);FS.doChmod(stream,stream.node,mode,false)},doChown(stream,node,dontFollow){FS.doSetAttr(stream,node,{timestamp:Date.now(),dontFollow})},chown(path,uid,gid,dontFollow){var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}FS.doChown(null,node,dontFollow)},lchown(path,uid,gid){FS.chown(path,uid,gid,true)},fchown(fd,uid,gid){var stream=FS.getStreamChecked(fd);FS.doChown(stream,stream.node,false)},doTruncate(stream,node,len){if(FS.isDir(node.mode)){throw new FS.ErrnoError(31)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(28)}var errCode=FS.nodePermissions(node,"w");if(errCode){throw new FS.ErrnoError(errCode)}FS.doSetAttr(stream,node,{size:len,timestamp:Date.now()})},truncate(path,len){if(len<0){throw new FS.ErrnoError(28)}var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}FS.doTruncate(null,node,len)},ftruncate(fd,len){var stream=FS.getStreamChecked(fd);if(len<0||(stream.flags&2097155)===0){throw new FS.ErrnoError(28)}FS.doTruncate(stream,stream.node,len)},utime(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;var setattr=FS.checkOpExists(node.node_ops.setattr,63);setattr(node,{atime,mtime})},open(path,flags,mode=438){if(path===""){throw new FS.ErrnoError(44)}flags=typeof flags=="string"?FS_modeStringToFlags(flags):flags;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;var isDirPath;if(typeof path=="object"){node=path}else{isDirPath=path.endsWith("/");var lookup=FS.lookupPath(path,{follow:!(flags&131072),noent_okay:true});node=lookup.node;path=lookup.path}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(20)}}else if(isDirPath){throw new FS.ErrnoError(31)}else{node=FS.mknod(path,mode|511,0);created=true}}if(!node){throw new FS.ErrnoError(44)}if(FS.isChrdev(node.mode)){flags&=~512}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}if(!created){var errCode=FS.mayOpen(node,flags);if(errCode){throw new FS.ErrnoError(errCode)}}if(flags&512&&!created){FS.truncate(node,0)}flags&=~(128|512|131072);var stream=FS.createStream({node,path:FS.getPath(node),flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false});if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(created){FS.chmod(node,mode&511)}if(Module["logReadFiles"]&&!(flags&1)){if(!(path in FS.readFiles)){FS.readFiles[path]=1}}return stream},close(stream){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}stream.fd=null},isClosed(stream){return stream.fd===null},llseek(stream,offset,whence){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(70)}if(whence!=0&&whence!=1&&whence!=2){throw new FS.ErrnoError(28)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position},read(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.read){throw new FS.ErrnoError(28)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead},write(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.write){throw new FS.ErrnoError(28)}if(stream.seekable&&stream.flags&1024){FS.llseek(stream,0,2)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten},mmap(stream,length,position,prot,flags){if((prot&2)!==0&&(flags&2)===0&&(stream.flags&2097155)!==2){throw new FS.ErrnoError(2)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(2)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(43)}if(!length){throw new FS.ErrnoError(28)}return stream.stream_ops.mmap(stream,length,position,prot,flags)},msync(stream,buffer,offset,length,mmapFlags){if(!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)},ioctl(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(59)}return stream.stream_ops.ioctl(stream,cmd,arg)},readFile(path,opts={}){opts.flags=opts.flags||0;opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){abort(`Invalid encoding type "${opts.encoding}"`)}var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){buf=UTF8ArrayToString(buf)}FS.close(stream);return buf},writeFile(path,data,opts={}){opts.flags=opts.flags||577;var stream=FS.open(path,opts.flags,opts.mode);if(typeof data=="string"){data=new Uint8Array(intArrayFromString(data,true))}if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)}else{abort("Unsupported data type")}FS.close(stream)},cwd:()=>FS.currentPath,chdir(path){var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(44)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(54)}var errCode=FS.nodePermissions(lookup.node,"x");if(errCode){throw new FS.ErrnoError(errCode)}FS.currentPath=lookup.path},createDefaultDirectories(){FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user")},createDefaultDevices(){FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:()=>0,write:(stream,buffer,offset,length,pos)=>length,llseek:()=>0});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var randomBuffer=new Uint8Array(1024),randomLeft=0;var randomByte=()=>{if(randomLeft===0){randomFill(randomBuffer);randomLeft=randomBuffer.byteLength}return randomBuffer[--randomLeft]};FS.createDevice("/dev","random",randomByte);FS.createDevice("/dev","urandom",randomByte);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp")},createSpecialDirectories(){FS.mkdir("/proc");var proc_self=FS.mkdir("/proc/self");FS.mkdir("/proc/self/fd");FS.mount({mount(){var node=FS.createNode(proc_self,"fd",16895,73);node.stream_ops={llseek:MEMFS.stream_ops.llseek};node.node_ops={lookup(parent,name){var fd=+name;var stream=FS.getStreamChecked(fd);var ret={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>stream.path},id:fd+1};ret.parent=ret;return ret},readdir(){return Array.from(FS.streams.entries()).filter(([k,v])=>v).map(([k,v])=>k.toString())}};return node}},{},"/proc/self/fd")},createStandardStreams(input,output,error){if(input){FS.createDevice("/dev","stdin",input)}else{FS.symlink("/dev/tty","/dev/stdin")}if(output){FS.createDevice("/dev","stdout",null,output)}else{FS.symlink("/dev/tty","/dev/stdout")}if(error){FS.createDevice("/dev","stderr",null,error)}else{FS.symlink("/dev/tty1","/dev/stderr")}var stdin=FS.open("/dev/stdin",0);var stdout=FS.open("/dev/stdout",1);var stderr=FS.open("/dev/stderr",1)},staticInit(){FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={MEMFS}},init(input,output,error){FS.initialized=true;input??=Module["stdin"];output??=Module["stdout"];error??=Module["stderr"];FS.createStandardStreams(input,output,error)},quit(){FS.initialized=false;for(var stream of FS.streams){if(stream){FS.close(stream)}}},findObject(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(!ret.exists){return null}return ret.object},analyzePath(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/"}catch(e){ret.error=e.errno}return ret},createPath(parent,path,canRead,canWrite){parent=typeof parent=="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){if(e.errno!=20)throw e}parent=current}return current},createFile(parent,name,properties,canRead,canWrite){var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(canRead,canWrite);return FS.create(path,mode)},createDataFile(parent,name,data,canRead,canWrite,canOwn){var path=name;if(parent){parent=typeof parent=="string"?parent:FS.getPath(parent);path=name?PATH.join2(parent,name):parent}var mode=FS_getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data=="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,577);FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}},createDevice(parent,name,input,output){var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(!!input,!!output);FS.createDevice.major??=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open(stream){stream.seekable=false},close(stream){if(output?.buffer?.length){output(10)}},read(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.atime=Date.now()}return bytesRead},write(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(29)}}if(length){stream.node.mtime=stream.node.ctime=Date.now()}return i}});return FS.mkdev(path,mode,dev)},forceLoadFile(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;if(globalThis.XMLHttpRequest){abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else{try{obj.contents=readBinary(obj.url)}catch(e){throw new FS.ErrnoError(29)}}},createLazyFile(parent,name,url,canRead,canWrite){class LazyUint8Array{lengthKnown=false;chunks=[];get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]}setDataGetter(getter){this.getter=getter}cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))abort("Couldn\'t load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(from,to)=>{if(from>to)abort("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)abort("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))abort("Couldn\'t load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}return intArrayFromString(xhr.responseText||"",true)};var lazyArray=this;lazyArray.setDataGetter(chunkNum=>{var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]=="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]=="undefined")abort("doXHR failed!");return lazyArray.chunks[chunkNum]});if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;out("LazyFiles on gzip forces download of the whole file when length is accessed")}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true}get length(){if(!this.lengthKnown){this.cacheLength()}return this._length}get chunkSize(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize}}if(globalThis.XMLHttpRequest){if(!ENVIRONMENT_IS_WORKER)abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");var lazyArray=new LazyUint8Array;var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperties(node,{usedBytes:{get:function(){return this.contents.length}}});var stream_ops={};for(const[key,fn]of Object.entries(node.stream_ops)){stream_ops[key]=(...args)=>{FS.forceLoadFile(node);return fn(...args)}}function writeChunks(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size}stream_ops.read=(stream,buffer,offset,length,position)=>{FS.forceLoadFile(node);return writeChunks(stream,buffer,offset,length,position)};stream_ops.mmap=(stream,length,position,prot,flags)=>{FS.forceLoadFile(node);var ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}writeChunks(stream,(growMemViews(),HEAP8),ptr,length,position);return{ptr,allocated:true}};node.stream_ops=stream_ops;return node}};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>ptr?UTF8ArrayToString((growMemViews(),HEAPU8),ptr,maxBytesToRead,ignoreNul):"";var SYSCALLS={DEFAULT_POLLMASK:5,calculateAt(dirfd,path,allowEmpty){if(PATH.isAbs(path)){return path}var dir;if(dirfd===-100){dir=FS.cwd()}else{var dirstream=SYSCALLS.getStreamFromFD(dirfd);dir=dirstream.path}if(path.length==0){if(!allowEmpty){throw new FS.ErrnoError(44)}return dir}return dir+"/"+path},writeStat(buf,stat){(growMemViews(),HEAPU32)[buf/4]=stat.dev;(growMemViews(),HEAPU32)[(buf+4)/4]=stat.mode;(growMemViews(),HEAPU64)[(buf+8)/8]=BigInt(stat.nlink);(growMemViews(),HEAPU32)[(buf+16)/4]=stat.uid;(growMemViews(),HEAPU32)[(buf+20)/4]=stat.gid;(growMemViews(),HEAPU32)[(buf+24)/4]=stat.rdev;(growMemViews(),HEAP64)[(buf+32)/8]=BigInt(stat.size);(growMemViews(),HEAP32)[(buf+40)/4]=4096;(growMemViews(),HEAP32)[(buf+44)/4]=stat.blocks;var atime=stat.atime.getTime();var mtime=stat.mtime.getTime();var ctime=stat.ctime.getTime();(growMemViews(),HEAP64)[(buf+48)/8]=BigInt(Math.floor(atime/1e3));(growMemViews(),HEAPU64)[(buf+56)/8]=BigInt(atime%1e3*1e3*1e3);(growMemViews(),HEAP64)[(buf+64)/8]=BigInt(Math.floor(mtime/1e3));(growMemViews(),HEAPU64)[(buf+72)/8]=BigInt(mtime%1e3*1e3*1e3);(growMemViews(),HEAP64)[(buf+80)/8]=BigInt(Math.floor(ctime/1e3));(growMemViews(),HEAPU64)[(buf+88)/8]=BigInt(ctime%1e3*1e3*1e3);(growMemViews(),HEAP64)[(buf+96)/8]=BigInt(stat.ino);return 0},writeStatFs(buf,stats){(growMemViews(),HEAPU32)[(buf+8)/4]=stats.bsize;(growMemViews(),HEAPU32)[(buf+72)/4]=stats.bsize;(growMemViews(),HEAP64)[(buf+16)/8]=BigInt(stats.blocks);(growMemViews(),HEAP64)[(buf+24)/8]=BigInt(stats.bfree);(growMemViews(),HEAP64)[(buf+32)/8]=BigInt(stats.bavail);(growMemViews(),HEAP64)[(buf+40)/8]=BigInt(stats.files);(growMemViews(),HEAP64)[(buf+48)/8]=BigInt(stats.ffree);(growMemViews(),HEAPU32)[(buf+56)/4]=stats.fsid;(growMemViews(),HEAPU32)[(buf+80)/4]=stats.flags;(growMemViews(),HEAPU32)[(buf+64)/4]=stats.namelen},doMsync(addr,stream,len,flags,offset){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}if(flags&2){return 0}var buffer=(growMemViews(),HEAPU8).slice(addr,addr+len);FS.msync(stream,buffer,offset,len,flags)},getStreamFromFD(fd){var stream=FS.getStreamChecked(fd);return stream},varargs:undefined,getStr(ptr){var ret=UTF8ToString(ptr);return ret}};function ___syscall_fcntl64(fd,cmd,varargs){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(3,0,1,fd,cmd,varargs);varargs=bigintToI53Checked(varargs);SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(cmd){case 0:{var arg=syscallGetVarargI();if(arg<0){return-28}while(FS.streams[arg]){arg++}var newStream;newStream=FS.dupStream(stream,arg);return newStream.fd}case 1:case 2:return 0;case 3:return stream.flags;case 4:{var arg=syscallGetVarargI();stream.flags|=arg;return 0}case 5:{var arg=syscallGetVarargP();var offset=0;(growMemViews(),HEAP16)[(arg+offset)/2]=2;return 0}case 6:case 7:return 0}return-28}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_fstat64(fd,buf){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(4,0,1,fd,buf);buf=bigintToI53Checked(buf);try{return SYSCALLS.writeStat(buf,FS.fstat(fd))}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,(growMemViews(),HEAPU8),outPtr,maxBytesToWrite);function ___syscall_getcwd(buf,size){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(5,0,1,buf,size);buf=bigintToI53Checked(buf);size=bigintToI53Checked(size);try{if(size===0)return-28;var cwd=FS.cwd();var cwdLengthInBytes=lengthBytesUTF8(cwd)+1;if(size<cwdLengthInBytes)return-68;stringToUTF8(cwd,buf,size);return cwdLengthInBytes}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_getdents64(fd,dirp,count){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(6,0,1,fd,dirp,count);dirp=bigintToI53Checked(dirp);count=bigintToI53Checked(count);try{var stream=SYSCALLS.getStreamFromFD(fd);stream.getdents||=FS.readdir(stream.path);var struct_size=280;var pos=0;var off=FS.llseek(stream,0,1);var startIdx=Math.floor(off/struct_size);var endIdx=Math.min(stream.getdents.length,startIdx+Math.floor(count/struct_size));for(var idx=startIdx;idx<endIdx;idx++){var id;var type;var name=stream.getdents[idx];if(name==="."){id=stream.node.id;type=4}else if(name===".."){var lookup=FS.lookupPath(stream.path,{parent:true});id=lookup.node.id;type=4}else{var child;try{child=FS.lookupNode(stream.node,name)}catch(e){if(e?.errno===28){continue}throw e}id=child.id;type=FS.isChrdev(child.mode)?2:FS.isDir(child.mode)?4:FS.isLink(child.mode)?10:8}(growMemViews(),HEAP64)[(dirp+pos)/8]=BigInt(id);(growMemViews(),HEAP64)[(dirp+pos+8)/8]=BigInt((idx+1)*struct_size);(growMemViews(),HEAP16)[(dirp+pos+16)/2]=280;(growMemViews(),HEAP8)[dirp+pos+18]=type;stringToUTF8(name,dirp+pos+19,256);pos+=struct_size}FS.llseek(stream,idx*struct_size,0);return pos}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_ioctl(fd,op,varargs){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(7,0,1,fd,op,varargs);varargs=bigintToI53Checked(varargs);SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(op){case 21509:{if(!stream.tty)return-59;return 0}case 21505:{if(!stream.tty)return-59;if(stream.tty.ops.ioctl_tcgets){var termios=stream.tty.ops.ioctl_tcgets(stream);var argp=syscallGetVarargP();(growMemViews(),HEAP32)[argp/4]=termios.c_iflag||0;(growMemViews(),HEAP32)[(argp+4)/4]=termios.c_oflag||0;(growMemViews(),HEAP32)[(argp+8)/4]=termios.c_cflag||0;(growMemViews(),HEAP32)[(argp+12)/4]=termios.c_lflag||0;for(var i=0;i<32;i++){(growMemViews(),HEAP8)[argp+i+17]=termios.c_cc[i]||0}return 0}return 0}case 21510:case 21511:case 21512:{if(!stream.tty)return-59;return 0}case 21506:case 21507:case 21508:{if(!stream.tty)return-59;if(stream.tty.ops.ioctl_tcsets){var argp=syscallGetVarargP();var c_iflag=(growMemViews(),HEAP32)[argp/4];var c_oflag=(growMemViews(),HEAP32)[(argp+4)/4];var c_cflag=(growMemViews(),HEAP32)[(argp+8)/4];var c_lflag=(growMemViews(),HEAP32)[(argp+12)/4];var c_cc=[];for(var i=0;i<32;i++){c_cc.push((growMemViews(),HEAP8)[argp+i+17])}return stream.tty.ops.ioctl_tcsets(stream.tty,op,{c_iflag,c_oflag,c_cflag,c_lflag,c_cc})}return 0}case 21519:{if(!stream.tty)return-59;var argp=syscallGetVarargP();(growMemViews(),HEAP32)[argp/4]=0;return 0}case 21520:{if(!stream.tty)return-59;return-28}case 21537:case 21531:{var argp=syscallGetVarargP();return FS.ioctl(stream,op,argp)}case 21523:{if(!stream.tty)return-59;if(stream.tty.ops.ioctl_tiocgwinsz){var winsize=stream.tty.ops.ioctl_tiocgwinsz(stream.tty);var argp=syscallGetVarargP();(growMemViews(),HEAP16)[argp/2]=winsize[0];(growMemViews(),HEAP16)[(argp+2)/2]=winsize[1]}return 0}case 21524:{if(!stream.tty)return-59;return 0}case 21515:{if(!stream.tty)return-59;return 0}default:return-28}}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_lstat64(path,buf){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(8,0,1,path,buf);path=bigintToI53Checked(path);buf=bigintToI53Checked(buf);try{path=SYSCALLS.getStr(path);return SYSCALLS.writeStat(buf,FS.lstat(path))}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_newfstatat(dirfd,path,buf,flags){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(9,0,1,dirfd,path,buf,flags);path=bigintToI53Checked(path);buf=bigintToI53Checked(buf);try{path=SYSCALLS.getStr(path);var nofollow=flags&256;var allowEmpty=flags&4096;flags=flags&~6400;path=SYSCALLS.calculateAt(dirfd,path,allowEmpty);return SYSCALLS.writeStat(buf,nofollow?FS.lstat(path):FS.stat(path))}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_openat(dirfd,path,flags,varargs){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(10,0,1,dirfd,path,flags,varargs);path=bigintToI53Checked(path);varargs=bigintToI53Checked(varargs);SYSCALLS.varargs=varargs;try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path);var mode=varargs?syscallGetVarargI():0;return FS.open(path,flags,mode).fd}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function ___syscall_stat64(path,buf){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(11,0,1,path,buf);path=bigintToI53Checked(path);buf=bigintToI53Checked(buf);try{path=SYSCALLS.getStr(path);return SYSCALLS.writeStat(buf,FS.stat(path))}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}var __abort_js=()=>abort("");function __emscripten_init_main_thread_js(tb){tb=bigintToI53Checked(tb);__emscripten_thread_init(tb,!ENVIRONMENT_IS_WORKER,1,!ENVIRONMENT_IS_WEB,5242880,false);PThread.threadInitTLS()}var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var maybeExit=()=>{if(!keepRuntimeAlive()){try{if(ENVIRONMENT_IS_PTHREAD){if(_pthread_self())__emscripten_thread_exit(EXITSTATUS);return}_exit(EXITSTATUS)}catch(e){handleException(e)}}};var callUserCallback=func=>{if(ABORT){return}try{func();maybeExit()}catch(e){handleException(e)}};function __emscripten_thread_mailbox_await(pthread_ptr){pthread_ptr=bigintToI53Checked(pthread_ptr);if(Atomics.waitAsync){var wait=Atomics.waitAsync((growMemViews(),HEAP32),pthread_ptr/4,pthread_ptr);wait.value.then(checkMailbox);var waitingAsync=pthread_ptr+228;Atomics.store((growMemViews(),HEAP32),waitingAsync/4,1)}}var checkMailbox=()=>callUserCallback(()=>{var pthread_ptr=_pthread_self();if(pthread_ptr){__emscripten_thread_mailbox_await(pthread_ptr);__emscripten_check_mailbox()}});function __emscripten_notify_mailbox_postmessage(targetThread,currThreadId){targetThread=bigintToI53Checked(targetThread);currThreadId=bigintToI53Checked(currThreadId);if(targetThread==currThreadId){setTimeout(checkMailbox)}else if(ENVIRONMENT_IS_PTHREAD){postMessage({targetThread,cmd:"checkMailbox"})}else{var worker=PThread.pthreads[targetThread];if(!worker){return}worker.postMessage({cmd:"checkMailbox"})}}var proxiedJSCallArgs=[];function __emscripten_receive_on_main_thread_js(funcIndex,emAsmAddr,callingThread,numCallArgs,args){emAsmAddr=bigintToI53Checked(emAsmAddr);callingThread=bigintToI53Checked(callingThread);args=bigintToI53Checked(args);numCallArgs/=2;proxiedJSCallArgs.length=numCallArgs;var b=args/8;for(var i=0;i<numCallArgs;i++){if((growMemViews(),HEAP64)[b+2*i]){proxiedJSCallArgs[i]=(growMemViews(),HEAP64)[b+2*i+1]}else{proxiedJSCallArgs[i]=(growMemViews(),HEAPF64)[b+2*i+1]}}var func=proxiedFunctionTable[funcIndex];PThread.currentProxiedOperationCallerThread=callingThread;var rtn=func(...proxiedJSCallArgs);PThread.currentProxiedOperationCallerThread=0;if(typeof rtn=="bigint"){rtn=bigintToI53Checked(rtn)}return rtn}function __emscripten_thread_cleanup(thread){thread=bigintToI53Checked(thread);if(!ENVIRONMENT_IS_PTHREAD)cleanupThread(thread);else postMessage({cmd:"cleanupThread",thread})}function __emscripten_thread_set_strongref(thread){thread=bigintToI53Checked(thread);if(ENVIRONMENT_IS_NODE){PThread.pthreads[thread].ref()}}var isLeapYear=year=>year%4===0&&(year%100!==0||year%400===0);var MONTH_DAYS_LEAP_CUMULATIVE=[0,31,60,91,121,152,182,213,244,274,305,335];var MONTH_DAYS_REGULAR_CUMULATIVE=[0,31,59,90,120,151,181,212,243,273,304,334];var ydayFromDate=date=>{var leap=isLeapYear(date.getFullYear());var monthDaysCumulative=leap?MONTH_DAYS_LEAP_CUMULATIVE:MONTH_DAYS_REGULAR_CUMULATIVE;var yday=monthDaysCumulative[date.getMonth()]+date.getDate()-1;return yday};function __localtime_js(time,tmPtr){time=bigintToI53Checked(time);tmPtr=bigintToI53Checked(tmPtr);var date=new Date(time*1e3);(growMemViews(),HEAP32)[tmPtr/4]=date.getSeconds();(growMemViews(),HEAP32)[(tmPtr+4)/4]=date.getMinutes();(growMemViews(),HEAP32)[(tmPtr+8)/4]=date.getHours();(growMemViews(),HEAP32)[(tmPtr+12)/4]=date.getDate();(growMemViews(),HEAP32)[(tmPtr+16)/4]=date.getMonth();(growMemViews(),HEAP32)[(tmPtr+20)/4]=date.getFullYear()-1900;(growMemViews(),HEAP32)[(tmPtr+24)/4]=date.getDay();var yday=ydayFromDate(date)|0;(growMemViews(),HEAP32)[(tmPtr+28)/4]=yday;(growMemViews(),HEAP64)[(tmPtr+40)/8]=BigInt(-(date.getTimezoneOffset()*60));var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;(growMemViews(),HEAP32)[(tmPtr+32)/4]=dst}function __mmap_js(len,prot,flags,fd,offset,allocated,addr){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(12,0,1,len,prot,flags,fd,offset,allocated,addr);len=bigintToI53Checked(len);offset=bigintToI53Checked(offset);allocated=bigintToI53Checked(allocated);addr=bigintToI53Checked(addr);try{var stream=SYSCALLS.getStreamFromFD(fd);var res=FS.mmap(stream,len,offset,prot,flags);var ptr=res.ptr;(growMemViews(),HEAP32)[allocated/4]=res.allocated;(growMemViews(),HEAPU64)[addr/8]=BigInt(ptr);return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}function __munmap_js(addr,len,prot,flags,fd,offset){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(13,0,1,addr,len,prot,flags,fd,offset);addr=bigintToI53Checked(addr);len=bigintToI53Checked(len);offset=bigintToI53Checked(offset);try{var stream=SYSCALLS.getStreamFromFD(fd);if(prot&2){SYSCALLS.doMsync(addr,stream,len,flags,offset)}}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return-e.errno}}var __tzset_js=function(timezone,daylight,std_name,dst_name){timezone=bigintToI53Checked(timezone);daylight=bigintToI53Checked(daylight);std_name=bigintToI53Checked(std_name);dst_name=bigintToI53Checked(dst_name);var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);(growMemViews(),HEAPU64)[timezone/8]=BigInt(stdTimezoneOffset*60);(growMemViews(),HEAP32)[daylight/4]=Number(winterOffset!=summerOffset);var extractZone=timezoneOffset=>{var sign=timezoneOffset>=0?"-":"+";var absOffset=Math.abs(timezoneOffset);var hours=String(Math.floor(absOffset/60)).padStart(2,"0");var minutes=String(absOffset%60).padStart(2,"0");return`UTC${sign}${hours}${minutes}`};var winterName=extractZone(winterOffset);var summerName=extractZone(summerOffset);if(summerOffset<winterOffset){stringToUTF8(winterName,std_name,17);stringToUTF8(summerName,dst_name,17)}else{stringToUTF8(winterName,dst_name,17);stringToUTF8(summerName,std_name,17)}};var _emscripten_get_now=()=>performance.timeOrigin+performance.now();var _emscripten_date_now=()=>Date.now();var nowIsMonotonic=1;var checkWasiClock=clock_id=>clock_id>=0&&clock_id<=3;function _clock_time_get(clk_id,ignored_precision,ptime){ignored_precision=bigintToI53Checked(ignored_precision);ptime=bigintToI53Checked(ptime);if(!checkWasiClock(clk_id)){return 28}var now;if(clk_id===0){now=_emscripten_date_now()}else if(nowIsMonotonic){now=_emscripten_get_now()}else{return 52}var nsec=Math.round(now*1e3*1e3);(growMemViews(),HEAP64)[ptime/8]=BigInt(nsec);return 0}var _emscripten_check_blocking_allowed=()=>{};var runtimeKeepalivePush=()=>{runtimeKeepaliveCounter+=1};var _emscripten_exit_with_live_runtime=()=>{runtimeKeepalivePush();throw"unwind"};var jsStackTrace=()=>(new Error).stack.toString();var getCallstack=flags=>{var callstack=jsStackTrace();var lines=callstack.split("\\n");callstack="";var firefoxRe=new RegExp("\\\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");var chromeRe=new RegExp("\\\\s*at (.*?) \\\\((.*):(.*):(.*)\\\\)");for(var line of lines){var symbolName="";var file="";var lineno=0;var column=0;var parts=chromeRe.exec(line);if(parts?.length==5){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]}else{parts=firefoxRe.exec(line);if(parts?.length>=4){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]|0}else{callstack+=line+"\\n";continue}}if(symbolName=="_emscripten_log"||symbolName=="_emscripten_get_callstack"){callstack="";continue}if(flags&24){if(flags&64){file=file.substring(file.replace(/\\\\/g,"/").lastIndexOf("/")+1)}callstack+=`    at ${symbolName} (${file}:${lineno}:${column})\\n`}}callstack=callstack.replace(/\\s+$/,"");return callstack};function _emscripten_get_callstack(flags,str,maxbytes){str=bigintToI53Checked(str);var callstack=getCallstack(flags);if(!str||maxbytes<=0){return lengthBytesUTF8(callstack)+1}var bytesWrittenExcludingNull=stringToUTF8(callstack,str,maxbytes);return bytesWrittenExcludingNull+1}var getHeapMax=()=>4294967296;var _emscripten_get_heap_max=()=>BigInt(getHeapMax());var _emscripten_has_asyncify=()=>2;var _emscripten_num_logical_cores=()=>ENVIRONMENT_IS_NODE?require("os").cpus().length:navigator["hardwareConcurrency"];var growMemory=size=>{var oldHeapSize=wasmMemory.buffer.byteLength;var pages=(size-oldHeapSize+65535)/65536|0;try{wasmMemory.grow(BigInt(pages));updateMemoryViews();return 1}catch(e){}};function _emscripten_resize_heap(requestedSize){requestedSize=bigintToI53Checked(requestedSize);var oldSize=(growMemViews(),HEAPU8).length;if(requestedSize<=oldSize){return false}var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false}var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var writeI53ToI64=(ptr,num)=>{(growMemViews(),HEAPU32)[ptr/4]=num;var lower=(growMemViews(),HEAPU32)[ptr/4];(growMemViews(),HEAPU32)[(ptr+4)/4]=(num-lower)/4294967296};var stringToNewUTF8=str=>{var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8(str,ret,size);return ret};var readI53FromI64=ptr=>(growMemViews(),HEAPU32)[ptr/4]+(growMemViews(),HEAP32)[(ptr+4)/4]*4294967296;var WebGPU={Internals:{jsObjects:[],jsObjectInsert:(ptr,jsObject)=>{WebGPU.Internals.jsObjects[ptr]=jsObject},bufferOnUnmaps:[],futures:[],futureInsert:(futureId,promise)=>{WebGPU.Internals.futures[futureId]=new Promise(resolve=>promise.finally(()=>resolve(futureId)))}},getJsObject:ptr=>{if(!ptr)return undefined;return WebGPU.Internals.jsObjects[ptr]},importJsAdapter:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateAdapter(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsBindGroup:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateBindGroup(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsBindGroupLayout:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateBindGroupLayout(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsBuffer:(buffer,parentPtr=0)=>{assert(buffer.mapState==="unmapped");var bufferPtr=_emwgpuCreateBuffer(parentPtr);WebGPU.Internals.jsObjectInsert(bufferPtr,buffer);return bufferPtr},importJsCommandBuffer:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateCommandBuffer(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsCommandEncoder:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateCommandEncoder(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsComputePassEncoder:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateComputePassEncoder(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsComputePipeline:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateComputePipeline(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsDevice:(device,parentPtr=0)=>{var queuePtr=_emwgpuCreateQueue(parentPtr);var devicePtr=_emwgpuCreateDevice(parentPtr,queuePtr);WebGPU.Internals.jsObjectInsert(queuePtr,device.queue);WebGPU.Internals.jsObjectInsert(devicePtr,device);return devicePtr},importJsExternalTexture:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateExternalTexture(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsPipelineLayout:(obj,parentPtr=0)=>{var ptr=_emwgpuCreatePipelineLayout(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsQuerySet:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateQuerySet(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsQueue:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateQueue(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsRenderBundle:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateRenderBundle(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsRenderBundleEncoder:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateRenderBundleEncoder(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsRenderPassEncoder:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateRenderPassEncoder(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsRenderPipeline:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateRenderPipeline(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsSampler:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateSampler(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsShaderModule:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateShaderModule(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsSurface:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateSurface(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsTexture:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateTexture(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},importJsTextureView:(obj,parentPtr=0)=>{var ptr=_emwgpuCreateTextureView(parentPtr);WebGPU.Internals.jsObjects[ptr]=obj;return ptr},errorCallback:(callback,type,message,userdata)=>{var sp=stackSave();var messagePtr=stringToUTF8OnStack(message);((a1,a2,a3)=>getWasmTableEntry(callback).call(null,a1,BigInt(a2),BigInt(a3)))(type,BigInt(messagePtr),userdata);stackRestore(sp)},iterateExtensions:(root,handlers)=>{for(var ptr=Number((growMemViews(),HEAPU64)[root/8]);ptr;ptr=Number((growMemViews(),HEAPU64)[ptr/8])){var sType=(growMemViews(),HEAP32)[(ptr+8)/4];var handler=handlers[sType](ptr)}},setStringView:(ptr,data,length)=>{(growMemViews(),HEAPU64)[ptr/8]=BigInt(data);(growMemViews(),HEAPU64)[(ptr+8)/8]=BigInt(length)},makeStringFromStringView:stringViewPtr=>{var ptr=Number((growMemViews(),HEAPU64)[stringViewPtr/8]);var length=Number((growMemViews(),HEAPU64)[(stringViewPtr+8)/8]);return UTF8ToString(ptr,length)},makeStringFromOptionalStringView:stringViewPtr=>{var ptr=Number((growMemViews(),HEAPU64)[stringViewPtr/8]);var length=Number((growMemViews(),HEAPU64)[(stringViewPtr+8)/8]);if(!ptr){if(length===0){return""}return undefined}return UTF8ToString(ptr,length)},makeColor:ptr=>({r:(growMemViews(),HEAPF64)[ptr/8],g:(growMemViews(),HEAPF64)[(ptr+8)/8],b:(growMemViews(),HEAPF64)[(ptr+16)/8],a:(growMemViews(),HEAPF64)[(ptr+24)/8]}),makeExtent3D:ptr=>({width:(growMemViews(),HEAPU32)[ptr/4],height:(growMemViews(),HEAPU32)[(ptr+4)/4],depthOrArrayLayers:(growMemViews(),HEAPU32)[(ptr+8)/4]}),makeOrigin3D:ptr=>({x:(growMemViews(),HEAPU32)[ptr/4],y:(growMemViews(),HEAPU32)[(ptr+4)/4],z:(growMemViews(),HEAPU32)[(ptr+8)/4]}),makeTexelCopyTextureInfo:ptr=>({texture:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[ptr/8])),mipLevel:(growMemViews(),HEAPU32)[(ptr+8)/4],origin:WebGPU.makeOrigin3D(ptr+12),aspect:WebGPU.TextureAspect[(growMemViews(),HEAP32)[(ptr+24)/4]]}),makeTexelCopyBufferLayout:ptr=>{var bytesPerRow=(growMemViews(),HEAPU32)[(ptr+8)/4];var rowsPerImage=(growMemViews(),HEAPU32)[(ptr+12)/4];return{offset:readI53FromI64(ptr),bytesPerRow:bytesPerRow===4294967295?undefined:bytesPerRow,rowsPerImage:rowsPerImage===4294967295?undefined:rowsPerImage}},makeTexelCopyBufferInfo:ptr=>{var layoutPtr=ptr+0;var bufferCopyView=WebGPU.makeTexelCopyBufferLayout(layoutPtr);bufferCopyView["buffer"]=WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(ptr+16)/8]));return bufferCopyView},makePassTimestampWrites:ptr=>{if(ptr===0)return undefined;return{querySet:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(ptr+8)/8])),beginningOfPassWriteIndex:(growMemViews(),HEAPU32)[(ptr+16)/4],endOfPassWriteIndex:(growMemViews(),HEAPU32)[(ptr+20)/4]}},makePipelineConstants:(constantCount,constantsPtr)=>{if(!constantCount)return;var constants={};for(var i=0;i<constantCount;++i){var entryPtr=constantsPtr+32*i;var key=WebGPU.makeStringFromStringView(entryPtr+8);constants[key]=(growMemViews(),HEAPF64)[(entryPtr+24)/8]}return constants},makePipelineLayout:layoutPtr=>{if(!layoutPtr)return"auto";return WebGPU.getJsObject(layoutPtr)},makeComputeState:ptr=>{if(!ptr)return undefined;var desc={module:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(ptr+8)/8])),constants:WebGPU.makePipelineConstants(Number((growMemViews(),HEAPU64)[(ptr+32)/8]),Number((growMemViews(),HEAPU64)[(ptr+40)/8])),entryPoint:WebGPU.makeStringFromOptionalStringView(ptr+16)};return desc},makeComputePipelineDesc:descriptor=>{var desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),layout:WebGPU.makePipelineLayout(Number((growMemViews(),HEAPU64)[(descriptor+24)/8])),compute:WebGPU.makeComputeState(descriptor+32)};return desc},makeRenderPipelineDesc:descriptor=>{function makePrimitiveState(psPtr){if(!psPtr)return undefined;return{topology:WebGPU.PrimitiveTopology[(growMemViews(),HEAP32)[(psPtr+8)/4]],stripIndexFormat:WebGPU.IndexFormat[(growMemViews(),HEAP32)[(psPtr+12)/4]],frontFace:WebGPU.FrontFace[(growMemViews(),HEAP32)[(psPtr+16)/4]],cullMode:WebGPU.CullMode[(growMemViews(),HEAP32)[(psPtr+20)/4]],unclippedDepth:!!(growMemViews(),HEAPU32)[(psPtr+24)/4]}}function makeBlendComponent(bdPtr){if(!bdPtr)return undefined;return{operation:WebGPU.BlendOperation[(growMemViews(),HEAP32)[bdPtr/4]],srcFactor:WebGPU.BlendFactor[(growMemViews(),HEAP32)[(bdPtr+4)/4]],dstFactor:WebGPU.BlendFactor[(growMemViews(),HEAP32)[(bdPtr+8)/4]]}}function makeBlendState(bsPtr){if(!bsPtr)return undefined;return{alpha:makeBlendComponent(bsPtr+12),color:makeBlendComponent(bsPtr+0)}}function makeColorState(csPtr){var format=WebGPU.TextureFormat[(growMemViews(),HEAP32)[(csPtr+8)/4]];return format?{format,blend:makeBlendState(Number((growMemViews(),HEAPU64)[(csPtr+16)/8])),writeMask:(growMemViews(),HEAPU32)[(csPtr+24)/4]}:undefined}function makeColorStates(count,csArrayPtr){var states=[];for(var i=0;i<count;++i){states.push(makeColorState(csArrayPtr+32*i))}return states}function makeStencilStateFace(ssfPtr){return{compare:WebGPU.CompareFunction[(growMemViews(),HEAP32)[ssfPtr/4]],failOp:WebGPU.StencilOperation[(growMemViews(),HEAP32)[(ssfPtr+4)/4]],depthFailOp:WebGPU.StencilOperation[(growMemViews(),HEAP32)[(ssfPtr+8)/4]],passOp:WebGPU.StencilOperation[(growMemViews(),HEAP32)[(ssfPtr+12)/4]]}}function makeDepthStencilState(dssPtr){if(!dssPtr)return undefined;return{format:WebGPU.TextureFormat[(growMemViews(),HEAP32)[(dssPtr+8)/4]],depthWriteEnabled:!!(growMemViews(),HEAPU32)[(dssPtr+12)/4],depthCompare:WebGPU.CompareFunction[(growMemViews(),HEAP32)[(dssPtr+16)/4]],stencilFront:makeStencilStateFace(dssPtr+20),stencilBack:makeStencilStateFace(dssPtr+36),stencilReadMask:(growMemViews(),HEAPU32)[(dssPtr+52)/4],stencilWriteMask:(growMemViews(),HEAPU32)[(dssPtr+56)/4],depthBias:(growMemViews(),HEAP32)[(dssPtr+60)/4],depthBiasSlopeScale:(growMemViews(),HEAPF32)[(dssPtr+64)/4],depthBiasClamp:(growMemViews(),HEAPF32)[(dssPtr+68)/4]}}function makeVertexAttribute(vaPtr){return{format:WebGPU.VertexFormat[(growMemViews(),HEAP32)[(vaPtr+8)/4]],offset:readI53FromI64(vaPtr+16),shaderLocation:(growMemViews(),HEAPU32)[(vaPtr+24)/4]}}function makeVertexAttributes(count,vaArrayPtr){var vas=[];for(var i=0;i<count;++i){vas.push(makeVertexAttribute(vaArrayPtr+i*32))}return vas}function makeVertexBuffer(vbPtr){if(!vbPtr)return undefined;var stepMode=WebGPU.VertexStepMode[(growMemViews(),HEAP32)[(vbPtr+8)/4]];var attributeCount=Number((growMemViews(),HEAPU64)[(vbPtr+24)/8]);if(!stepMode&&!attributeCount){return null}return{arrayStride:readI53FromI64(vbPtr+16),stepMode,attributes:makeVertexAttributes(attributeCount,Number((growMemViews(),HEAPU64)[(vbPtr+32)/8]))}}function makeVertexBuffers(count,vbArrayPtr){if(!count)return undefined;var vbs=[];for(var i=0;i<count;++i){vbs.push(makeVertexBuffer(vbArrayPtr+i*40))}return vbs}function makeVertexState(viPtr){if(!viPtr)return undefined;var desc={module:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(viPtr+8)/8])),constants:WebGPU.makePipelineConstants(Number((growMemViews(),HEAPU64)[(viPtr+32)/8]),Number((growMemViews(),HEAPU64)[(viPtr+40)/8])),buffers:makeVertexBuffers(Number((growMemViews(),HEAPU64)[(viPtr+48)/8]),Number((growMemViews(),HEAPU64)[(viPtr+56)/8])),entryPoint:WebGPU.makeStringFromOptionalStringView(viPtr+16)};return desc}function makeMultisampleState(msPtr){if(!msPtr)return undefined;return{count:(growMemViews(),HEAPU32)[(msPtr+8)/4],mask:(growMemViews(),HEAPU32)[(msPtr+12)/4],alphaToCoverageEnabled:!!(growMemViews(),HEAPU32)[(msPtr+16)/4]}}function makeFragmentState(fsPtr){if(!fsPtr)return undefined;var desc={module:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(fsPtr+8)/8])),constants:WebGPU.makePipelineConstants(Number((growMemViews(),HEAPU64)[(fsPtr+32)/8]),Number((growMemViews(),HEAPU64)[(fsPtr+40)/8])),targets:makeColorStates(Number((growMemViews(),HEAPU64)[(fsPtr+48)/8]),Number((growMemViews(),HEAPU64)[(fsPtr+56)/8])),entryPoint:WebGPU.makeStringFromOptionalStringView(fsPtr+16)};return desc}var desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),layout:WebGPU.makePipelineLayout(Number((growMemViews(),HEAPU64)[(descriptor+24)/8])),vertex:makeVertexState(descriptor+32),primitive:makePrimitiveState(descriptor+96),depthStencil:makeDepthStencilState(Number((growMemViews(),HEAPU64)[(descriptor+128)/8])),multisample:makeMultisampleState(descriptor+136),fragment:makeFragmentState(Number((growMemViews(),HEAPU64)[(descriptor+160)/8]))};return desc},fillLimitStruct:(limits,limitsOutPtr)=>{var nextInChainPtr=Number((growMemViews(),HEAPU64)[limitsOutPtr/8]);function setLimitValueU32(name,basePtr,limitOffset,fallbackValue=0){var limitValue=limits[name]??fallbackValue;(growMemViews(),HEAPU32)[(basePtr+limitOffset)/4]=limitValue}function setLimitValueU64(name,basePtr,limitOffset,fallbackValue=0){var limitValue=limits[name]??fallbackValue;writeI53ToI64(basePtr+limitOffset,limitValue)}setLimitValueU32("maxTextureDimension1D",limitsOutPtr,8);setLimitValueU32("maxTextureDimension2D",limitsOutPtr,12);setLimitValueU32("maxTextureDimension3D",limitsOutPtr,16);setLimitValueU32("maxTextureArrayLayers",limitsOutPtr,20);setLimitValueU32("maxBindGroups",limitsOutPtr,24);setLimitValueU32("maxBindGroupsPlusVertexBuffers",limitsOutPtr,28);setLimitValueU32("maxBindingsPerBindGroup",limitsOutPtr,32);setLimitValueU32("maxDynamicUniformBuffersPerPipelineLayout",limitsOutPtr,36);setLimitValueU32("maxDynamicStorageBuffersPerPipelineLayout",limitsOutPtr,40);setLimitValueU32("maxSampledTexturesPerShaderStage",limitsOutPtr,44);setLimitValueU32("maxSamplersPerShaderStage",limitsOutPtr,48);setLimitValueU32("maxStorageBuffersPerShaderStage",limitsOutPtr,52);setLimitValueU32("maxStorageTexturesPerShaderStage",limitsOutPtr,56);setLimitValueU32("maxUniformBuffersPerShaderStage",limitsOutPtr,60);setLimitValueU32("minUniformBufferOffsetAlignment",limitsOutPtr,80);setLimitValueU32("minStorageBufferOffsetAlignment",limitsOutPtr,84);setLimitValueU64("maxUniformBufferBindingSize",limitsOutPtr,64);setLimitValueU64("maxStorageBufferBindingSize",limitsOutPtr,72);setLimitValueU32("maxVertexBuffers",limitsOutPtr,88);setLimitValueU64("maxBufferSize",limitsOutPtr,96);setLimitValueU32("maxVertexAttributes",limitsOutPtr,104);setLimitValueU32("maxVertexBufferArrayStride",limitsOutPtr,108);setLimitValueU32("maxInterStageShaderVariables",limitsOutPtr,112);setLimitValueU32("maxColorAttachments",limitsOutPtr,116);setLimitValueU32("maxColorAttachmentBytesPerSample",limitsOutPtr,120);setLimitValueU32("maxComputeWorkgroupStorageSize",limitsOutPtr,124);setLimitValueU32("maxComputeInvocationsPerWorkgroup",limitsOutPtr,128);setLimitValueU32("maxComputeWorkgroupSizeX",limitsOutPtr,132);setLimitValueU32("maxComputeWorkgroupSizeY",limitsOutPtr,136);setLimitValueU32("maxComputeWorkgroupSizeZ",limitsOutPtr,140);setLimitValueU32("maxComputeWorkgroupsPerDimension",limitsOutPtr,144);setLimitValueU32("maxImmediateSize",limitsOutPtr,148);if(nextInChainPtr!==0){var sType=(growMemViews(),HEAP32)[(nextInChainPtr+8)/4];var compatibilityModeLimitsPtr=nextInChainPtr;setLimitValueU32("maxStorageBuffersInVertexStage",compatibilityModeLimitsPtr,16,limits.maxStorageBuffersPerShaderStage);setLimitValueU32("maxStorageBuffersInFragmentStage",compatibilityModeLimitsPtr,24,limits.maxStorageBuffersPerShaderStage);setLimitValueU32("maxStorageTexturesInVertexStage",compatibilityModeLimitsPtr,20,limits.maxStorageTexturesPerShaderStage);setLimitValueU32("maxStorageTexturesInFragmentStage",compatibilityModeLimitsPtr,28,limits.maxStorageTexturesPerShaderStage)}},fillAdapterInfoStruct:(info,infoStruct)=>{(growMemViews(),HEAPU32)[(infoStruct+88)/4]=info.subgroupMinSize;(growMemViews(),HEAPU32)[(infoStruct+92)/4]=info.subgroupMaxSize;var strs=info.vendor+info.architecture+info.device+info.description;var strPtr=stringToNewUTF8(strs);var vendorLen=lengthBytesUTF8(info.vendor);WebGPU.setStringView(infoStruct+8,strPtr,vendorLen);strPtr+=vendorLen;var architectureLen=lengthBytesUTF8(info.architecture);WebGPU.setStringView(infoStruct+24,strPtr,architectureLen);strPtr+=architectureLen;var deviceLen=lengthBytesUTF8(info.device);WebGPU.setStringView(infoStruct+40,strPtr,deviceLen);strPtr+=deviceLen;var descriptionLen=lengthBytesUTF8(info.description);WebGPU.setStringView(infoStruct+56,strPtr,descriptionLen);strPtr+=descriptionLen;(growMemViews(),HEAP32)[(infoStruct+72)/4]=2;var adapterType=info.isFallbackAdapter?3:4;(growMemViews(),HEAP32)[(infoStruct+76)/4]=adapterType;(growMemViews(),HEAPU32)[(infoStruct+80)/4]=0;(growMemViews(),HEAPU32)[(infoStruct+84)/4]=0},AddressMode:[,"clamp-to-edge","repeat","mirror-repeat"],BlendFactor:[,"zero","one","src","one-minus-src","src-alpha","one-minus-src-alpha","dst","one-minus-dst","dst-alpha","one-minus-dst-alpha","src-alpha-saturated","constant","one-minus-constant","src1","one-minus-src1","src1-alpha","one-minus-src1-alpha"],BlendOperation:[,"add","subtract","reverse-subtract","min","max"],BufferBindingType:[,,"uniform","storage","read-only-storage"],BufferMapState:[,"unmapped","pending","mapped"],CompareFunction:[,"never","less","equal","less-equal","greater","not-equal","greater-equal","always"],CompilationInfoRequestStatus:[,"success","callback-cancelled"],ComponentSwizzle:[,"0","1","r","g","b","a"],CompositeAlphaMode:[,"opaque","premultiplied","unpremultiplied","inherit"],CullMode:[,"none","front","back"],ErrorFilter:[,"validation","out-of-memory","internal"],FeatureLevel:[,"compatibility","core"],FeatureName:{1:"core-features-and-limits",2:"depth-clip-control",3:"depth32float-stencil8",4:"texture-compression-bc",5:"texture-compression-bc-sliced-3d",6:"texture-compression-etc2",7:"texture-compression-astc",8:"texture-compression-astc-sliced-3d",9:"timestamp-query",10:"indirect-first-instance",11:"shader-f16",12:"rg11b10ufloat-renderable",13:"bgra8unorm-storage",14:"float32-filterable",15:"float32-blendable",16:"clip-distances",17:"dual-source-blending",18:"subgroups",19:"texture-formats-tier1",20:"texture-formats-tier2",21:"primitive-index",22:"texture-component-swizzle",327692:"chromium-experimental-unorm16-texture-formats",327729:"chromium-experimental-multi-draw-indirect"},FilterMode:[,"nearest","linear"],FrontFace:[,"ccw","cw"],IndexFormat:[,"uint16","uint32"],InstanceFeatureName:[,"timed-wait-any","shader-source-spirv","multiple-devices-per-adapter"],LoadOp:[,"load","clear"],MipmapFilterMode:[,"nearest","linear"],OptionalBool:["false","true"],PowerPreference:[,"low-power","high-performance"],PredefinedColorSpace:[,"srgb","display-p3"],PrimitiveTopology:[,"point-list","line-list","line-strip","triangle-list","triangle-strip"],QueryType:[,"occlusion","timestamp"],SamplerBindingType:[,,"filtering","non-filtering","comparison"],Status:[,"success","error"],StencilOperation:[,"keep","zero","replace","invert","increment-clamp","decrement-clamp","increment-wrap","decrement-wrap"],StorageTextureAccess:[,,"write-only","read-only","read-write"],StoreOp:[,"store","discard"],SurfaceGetCurrentTextureStatus:[,"success-optimal","success-suboptimal","timeout","outdated","lost","error"],TextureAspect:[,"all","stencil-only","depth-only"],TextureDimension:[,"1d","2d","3d"],TextureFormat:[,"r8unorm","r8snorm","r8uint","r8sint","r16unorm","r16snorm","r16uint","r16sint","r16float","rg8unorm","rg8snorm","rg8uint","rg8sint","r32float","r32uint","r32sint","rg16unorm","rg16snorm","rg16uint","rg16sint","rg16float","rgba8unorm","rgba8unorm-srgb","rgba8snorm","rgba8uint","rgba8sint","bgra8unorm","bgra8unorm-srgb","rgb10a2uint","rgb10a2unorm","rg11b10ufloat","rgb9e5ufloat","rg32float","rg32uint","rg32sint","rgba16unorm","rgba16snorm","rgba16uint","rgba16sint","rgba16float","rgba32float","rgba32uint","rgba32sint","stencil8","depth16unorm","depth24plus","depth24plus-stencil8","depth32float","depth32float-stencil8","bc1-rgba-unorm","bc1-rgba-unorm-srgb","bc2-rgba-unorm","bc2-rgba-unorm-srgb","bc3-rgba-unorm","bc3-rgba-unorm-srgb","bc4-r-unorm","bc4-r-snorm","bc5-rg-unorm","bc5-rg-snorm","bc6h-rgb-ufloat","bc6h-rgb-float","bc7-rgba-unorm","bc7-rgba-unorm-srgb","etc2-rgb8unorm","etc2-rgb8unorm-srgb","etc2-rgb8a1unorm","etc2-rgb8a1unorm-srgb","etc2-rgba8unorm","etc2-rgba8unorm-srgb","eac-r11unorm","eac-r11snorm","eac-rg11unorm","eac-rg11snorm","astc-4x4-unorm","astc-4x4-unorm-srgb","astc-5x4-unorm","astc-5x4-unorm-srgb","astc-5x5-unorm","astc-5x5-unorm-srgb","astc-6x5-unorm","astc-6x5-unorm-srgb","astc-6x6-unorm","astc-6x6-unorm-srgb","astc-8x5-unorm","astc-8x5-unorm-srgb","astc-8x6-unorm","astc-8x6-unorm-srgb","astc-8x8-unorm","astc-8x8-unorm-srgb","astc-10x5-unorm","astc-10x5-unorm-srgb","astc-10x6-unorm","astc-10x6-unorm-srgb","astc-10x8-unorm","astc-10x8-unorm-srgb","astc-10x10-unorm","astc-10x10-unorm-srgb","astc-12x10-unorm","astc-12x10-unorm-srgb","astc-12x12-unorm","astc-12x12-unorm-srgb"],TextureSampleType:[,,"float","unfilterable-float","depth","sint","uint"],TextureViewDimension:[,"1d","2d","2d-array","cube","cube-array","3d"],ToneMappingMode:[,"standard","extended"],VertexFormat:[,"uint8","uint8x2","uint8x4","sint8","sint8x2","sint8x4","unorm8","unorm8x2","unorm8x4","snorm8","snorm8x2","snorm8x4","uint16","uint16x2","uint16x4","sint16","sint16x2","sint16x4","unorm16","unorm16x2","unorm16x4","snorm16","snorm16x2","snorm16x4","float16","float16x2","float16x4","float32","float32x2","float32x3","float32x4","uint32","uint32x2","uint32x3","uint32x4","sint32","sint32x2","sint32x3","sint32x4","unorm10-10-10-2","unorm8x4-bgra"],VertexStepMode:[,"vertex","instance"],WGSLLanguageFeatureName:[,"readonly_and_readwrite_storage_textures","packed_4x8_integer_dot_product","unrestricted_pointer_parameters","pointer_composite_access","uniform_buffer_standard_layout","subgroup_id","texture_and_sampler_let","subgroup_uniformity","texture_formats_tier1"]};var emwgpuStringToInt_DeviceLostReason={undefined:1,unknown:1,destroyed:2};var runtimeKeepalivePop=()=>{runtimeKeepaliveCounter-=1};function _emwgpuAdapterRequestDevice(adapterPtr,futureId,deviceLostFutureId,devicePtr,queuePtr,descriptor){adapterPtr=bigintToI53Checked(adapterPtr);futureId=bigintToI53Checked(futureId);deviceLostFutureId=bigintToI53Checked(deviceLostFutureId);devicePtr=bigintToI53Checked(devicePtr);queuePtr=bigintToI53Checked(queuePtr);descriptor=bigintToI53Checked(descriptor);var adapter=WebGPU.getJsObject(adapterPtr);var desc={};if(descriptor){var requiredFeatureCount=Number((growMemViews(),HEAPU64)[(descriptor+24)/8]);if(requiredFeatureCount){var requiredFeaturesPtr=Number((growMemViews(),HEAPU64)[(descriptor+32)/8]);desc["requiredFeatures"]=Array.from((growMemViews(),HEAPU32).subarray(requiredFeaturesPtr/4,(requiredFeaturesPtr+requiredFeatureCount*4)/4),feature=>WebGPU.FeatureName[feature])}var limitsPtr=Number((growMemViews(),HEAPU64)[(descriptor+40)/8]);if(limitsPtr){var nextInChainPtr=Number((growMemViews(),HEAPU64)[limitsPtr/8]);var requiredLimits={};function setLimitU32IfDefined(name,basePtr,limitOffset,ignoreIfZero=false){var ptr=basePtr+limitOffset;var value=(growMemViews(),HEAPU32)[ptr/4];if(value!=4294967295&&(!ignoreIfZero||value!=0)){requiredLimits[name]=value}}function setLimitU64IfDefined(name,basePtr,limitOffset){var ptr=basePtr+limitOffset;var limitPart1=(growMemViews(),HEAPU32)[ptr/4];var limitPart2=(growMemViews(),HEAPU32)[(ptr+4)/4];if(limitPart1!=4294967295||limitPart2!=4294967295){requiredLimits[name]=readI53FromI64(ptr)}}setLimitU32IfDefined("maxTextureDimension1D",limitsPtr,8);setLimitU32IfDefined("maxTextureDimension2D",limitsPtr,12);setLimitU32IfDefined("maxTextureDimension3D",limitsPtr,16);setLimitU32IfDefined("maxTextureArrayLayers",limitsPtr,20);setLimitU32IfDefined("maxBindGroups",limitsPtr,24);setLimitU32IfDefined("maxBindGroupsPlusVertexBuffers",limitsPtr,28);setLimitU32IfDefined("maxBindingsPerBindGroup",limitsPtr,32);setLimitU32IfDefined("maxDynamicUniformBuffersPerPipelineLayout",limitsPtr,36);setLimitU32IfDefined("maxDynamicStorageBuffersPerPipelineLayout",limitsPtr,40);setLimitU32IfDefined("maxSampledTexturesPerShaderStage",limitsPtr,44);setLimitU32IfDefined("maxSamplersPerShaderStage",limitsPtr,48);setLimitU32IfDefined("maxStorageBuffersPerShaderStage",limitsPtr,52);setLimitU32IfDefined("maxStorageTexturesPerShaderStage",limitsPtr,56);setLimitU32IfDefined("maxUniformBuffersPerShaderStage",limitsPtr,60);setLimitU32IfDefined("minUniformBufferOffsetAlignment",limitsPtr,80);setLimitU32IfDefined("minStorageBufferOffsetAlignment",limitsPtr,84);setLimitU64IfDefined("maxUniformBufferBindingSize",limitsPtr,64);setLimitU64IfDefined("maxStorageBufferBindingSize",limitsPtr,72);setLimitU32IfDefined("maxVertexBuffers",limitsPtr,88);setLimitU64IfDefined("maxBufferSize",limitsPtr,96);setLimitU32IfDefined("maxVertexAttributes",limitsPtr,104);setLimitU32IfDefined("maxVertexBufferArrayStride",limitsPtr,108);setLimitU32IfDefined("maxInterStageShaderVariables",limitsPtr,112);setLimitU32IfDefined("maxColorAttachments",limitsPtr,116);setLimitU32IfDefined("maxColorAttachmentBytesPerSample",limitsPtr,120);setLimitU32IfDefined("maxComputeWorkgroupStorageSize",limitsPtr,124);setLimitU32IfDefined("maxComputeInvocationsPerWorkgroup",limitsPtr,128);setLimitU32IfDefined("maxComputeWorkgroupSizeX",limitsPtr,132);setLimitU32IfDefined("maxComputeWorkgroupSizeY",limitsPtr,136);setLimitU32IfDefined("maxComputeWorkgroupSizeZ",limitsPtr,140);setLimitU32IfDefined("maxComputeWorkgroupsPerDimension",limitsPtr,144);setLimitU32IfDefined("maxImmediateSize",limitsPtr,148,true);if(nextInChainPtr!==0){var sType=(growMemViews(),HEAP32)[(nextInChainPtr+8)/4];var compatibilityModeLimitsPtr=nextInChainPtr;if("maxStorageBuffersInVertexStage"in GPUSupportedLimits.prototype){setLimitU32IfDefined("maxStorageBuffersInVertexStage",compatibilityModeLimitsPtr,16);setLimitU32IfDefined("maxStorageTexturesInVertexStage",compatibilityModeLimitsPtr,20);setLimitU32IfDefined("maxStorageBuffersInFragmentStage",compatibilityModeLimitsPtr,24);setLimitU32IfDefined("maxStorageTexturesInFragmentStage",compatibilityModeLimitsPtr,28)}}desc["requiredLimits"]=requiredLimits}var defaultQueuePtr=Number((growMemViews(),HEAPU64)[(descriptor+48)/8]);if(defaultQueuePtr){var defaultQueueDesc={label:WebGPU.makeStringFromOptionalStringView(defaultQueuePtr+8)};desc["defaultQueue"]=defaultQueueDesc}desc["label"]=WebGPU.makeStringFromOptionalStringView(descriptor+8)}runtimeKeepalivePush();WebGPU.Internals.futureInsert(futureId,adapter.requestDevice(desc).then(device=>{runtimeKeepalivePop();callUserCallback(()=>{WebGPU.Internals.jsObjectInsert(queuePtr,device.queue);WebGPU.Internals.jsObjectInsert(devicePtr,device);devicePtr=BigInt(devicePtr);WebGPU.Internals.futureInsert(deviceLostFutureId,device.lost.then(info=>{callUserCallback(()=>{device.onuncapturederror=ev=>{};var sp=stackSave();var messagePtr=stringToUTF8OnStack(info.message);_emwgpuOnDeviceLostCompleted(deviceLostFutureId,emwgpuStringToInt_DeviceLostReason[info.reason],BigInt(messagePtr));stackRestore(sp)})}));device.onuncapturederror=ev=>{var type=5;if(ev.error instanceof GPUValidationError)type=2;else if(ev.error instanceof GPUOutOfMemoryError)type=3;else if(ev.error instanceof GPUInternalError)type=4;var sp=stackSave();var messagePtr=stringToUTF8OnStack(ev.error.message);_emwgpuOnUncapturedError(BigInt(devicePtr),type,BigInt(messagePtr));stackRestore(sp)};_emwgpuOnRequestDeviceCompleted(futureId,1,BigInt(devicePtr),0n)})},ex=>{runtimeKeepalivePop();callUserCallback(()=>{var sp=stackSave();var messagePtr=stringToUTF8OnStack(ex.message);_emwgpuOnRequestDeviceCompleted(futureId,3,BigInt(devicePtr),BigInt(messagePtr));if(deviceLostFutureId){_emwgpuOnDeviceLostCompleted(deviceLostFutureId,4,BigInt(messagePtr))}stackRestore(sp)})}))}function _emwgpuBufferDestroy(bufferPtr){bufferPtr=bigintToI53Checked(bufferPtr);var buffer=WebGPU.getJsObject(bufferPtr);var onUnmap=WebGPU.Internals.bufferOnUnmaps[bufferPtr];if(onUnmap){for(var i=0;i<onUnmap.length;++i){onUnmap[i]()}delete WebGPU.Internals.bufferOnUnmaps[bufferPtr]}buffer.destroy()}var warnOnce=text=>{warnOnce.shown||={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;if(ENVIRONMENT_IS_NODE)text="warning: "+text;err(text)}};var _emwgpuBufferGetConstMappedRange=function(bufferPtr,offset,size){bufferPtr=bigintToI53Checked(bufferPtr);offset=bigintToI53Checked(offset);size=bigintToI53Checked(size);var ret=(()=>{var buffer=WebGPU.getJsObject(bufferPtr);if(size==-1)size=undefined;var mapped;try{mapped=buffer.getMappedRange(offset,size)}catch(ex){return 0n}var data=_memalign(16,mapped.byteLength);(growMemViews(),HEAPU8).set(new Uint8Array(mapped),data);WebGPU.Internals.bufferOnUnmaps[bufferPtr].push(()=>_free(data));return data})();return BigInt(ret)};var _emwgpuBufferMapAsync=function(bufferPtr,futureId,mode,offset,size){bufferPtr=bigintToI53Checked(bufferPtr);futureId=bigintToI53Checked(futureId);mode=bigintToI53Checked(mode);offset=bigintToI53Checked(offset);size=bigintToI53Checked(size);var buffer=WebGPU.getJsObject(bufferPtr);WebGPU.Internals.bufferOnUnmaps[bufferPtr]=[];if(size==-1)size=undefined;runtimeKeepalivePush();WebGPU.Internals.futureInsert(futureId,buffer.mapAsync(mode,offset,size).then(()=>{runtimeKeepalivePop();callUserCallback(()=>{_emwgpuOnMapAsyncCompleted(futureId,1,0n)})},ex=>{runtimeKeepalivePop();callUserCallback(()=>{var sp=stackSave();var messagePtr=stringToUTF8OnStack(ex.message);var status=ex.name==="AbortError"?4:ex.name==="OperationError"?3:0;_emwgpuOnMapAsyncCompleted(futureId,status,BigInt(messagePtr));delete WebGPU.Internals.bufferOnUnmaps[bufferPtr]})}))};function _emwgpuBufferUnmap(bufferPtr){bufferPtr=bigintToI53Checked(bufferPtr);var buffer=WebGPU.getJsObject(bufferPtr);var onUnmap=WebGPU.Internals.bufferOnUnmaps[bufferPtr];if(!onUnmap){return}for(var i=0;i<onUnmap.length;++i){onUnmap[i]()}delete WebGPU.Internals.bufferOnUnmaps[bufferPtr];buffer.unmap()}function _emwgpuDelete(ptr){ptr=bigintToI53Checked(ptr);delete WebGPU.Internals.jsObjects[ptr]}function _emwgpuDeviceCreateBuffer(devicePtr,descriptor,bufferPtr){devicePtr=bigintToI53Checked(devicePtr);descriptor=bigintToI53Checked(descriptor);bufferPtr=bigintToI53Checked(bufferPtr);var mappedAtCreation=!!(growMemViews(),HEAPU32)[(descriptor+40)/4];var desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),usage:(growMemViews(),HEAPU32)[(descriptor+24)/4],size:readI53FromI64(descriptor+32),mappedAtCreation};var device=WebGPU.getJsObject(devicePtr);var buffer;try{buffer=device.createBuffer(desc)}catch(ex){return false}WebGPU.Internals.jsObjectInsert(bufferPtr,buffer);if(mappedAtCreation){WebGPU.Internals.bufferOnUnmaps[bufferPtr]=[]}return true}function _emwgpuDeviceCreateShaderModule(devicePtr,descriptor,shaderModulePtr){devicePtr=bigintToI53Checked(devicePtr);descriptor=bigintToI53Checked(descriptor);shaderModulePtr=bigintToI53Checked(shaderModulePtr);var nextInChainPtr=Number((growMemViews(),HEAPU64)[descriptor/8]);var sType=(growMemViews(),HEAP32)[(nextInChainPtr+8)/4];var desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),code:""};switch(sType){case 2:{desc["code"]=WebGPU.makeStringFromStringView(nextInChainPtr+16);break}}var device=WebGPU.getJsObject(devicePtr);WebGPU.Internals.jsObjectInsert(shaderModulePtr,device.createShaderModule(desc))}var _emwgpuDeviceDestroy=devicePtr=>{const device=WebGPU.getJsObject(devicePtr);device.onuncapturederror=null;device.destroy()};function _emwgpuInstanceRequestAdapter(instancePtr,futureId,options,adapterPtr){instancePtr=bigintToI53Checked(instancePtr);futureId=bigintToI53Checked(futureId);options=bigintToI53Checked(options);adapterPtr=bigintToI53Checked(adapterPtr);var opts;if(options){opts={featureLevel:WebGPU.FeatureLevel[(growMemViews(),HEAP32)[(options+8)/4]],powerPreference:WebGPU.PowerPreference[(growMemViews(),HEAP32)[(options+12)/4]],forceFallbackAdapter:!!(growMemViews(),HEAPU32)[(options+16)/4]};var nextInChainPtr=Number((growMemViews(),HEAPU64)[options/8]);if(nextInChainPtr!==0){var sType=(growMemViews(),HEAP32)[(nextInChainPtr+8)/4];var webxrOptions=nextInChainPtr;opts.xrCompatible=!!(growMemViews(),HEAPU32)[(webxrOptions+16)/4]}}if(!("gpu"in navigator)){var sp=stackSave();var messagePtr=stringToUTF8OnStack("WebGPU not available on this browser (navigator.gpu is not available)");_emwgpuOnRequestAdapterCompleted(futureId,3,BigInt(adapterPtr),BigInt(messagePtr));stackRestore(sp);return}runtimeKeepalivePush();WebGPU.Internals.futureInsert(futureId,navigator.gpu.requestAdapter(opts).then(adapter=>{runtimeKeepalivePop();callUserCallback(()=>{if(adapter){WebGPU.Internals.jsObjectInsert(adapterPtr,adapter);_emwgpuOnRequestAdapterCompleted(futureId,1,BigInt(adapterPtr),0n)}else{var sp=stackSave();var messagePtr=stringToUTF8OnStack("WebGPU not available on this browser (requestAdapter returned null)");_emwgpuOnRequestAdapterCompleted(futureId,3,BigInt(adapterPtr),BigInt(messagePtr));stackRestore(sp)}})},ex=>{runtimeKeepalivePop();callUserCallback(()=>{var sp=stackSave();var messagePtr=stringToUTF8OnStack(ex.message);_emwgpuOnRequestAdapterCompleted(futureId,4,BigInt(adapterPtr),BigInt(messagePtr));stackRestore(sp)})}))}var _emwgpuQueueOnSubmittedWorkDone=function(queuePtr,futureId){queuePtr=bigintToI53Checked(queuePtr);futureId=bigintToI53Checked(futureId);var queue=WebGPU.getJsObject(queuePtr);runtimeKeepalivePush();WebGPU.Internals.futureInsert(futureId,queue.onSubmittedWorkDone().then(()=>{runtimeKeepalivePop();callUserCallback(()=>{_emwgpuOnWorkDoneCompleted(futureId,1)})}))};var _emwgpuWaitAny=function(futurePtr,futureCount,timeoutMSPtr){futurePtr=bigintToI53Checked(futurePtr);futureCount=bigintToI53Checked(futureCount);timeoutMSPtr=bigintToI53Checked(timeoutMSPtr);return Asyncify.handleAsync(async()=>{var promises=[];if(timeoutMSPtr){var timeoutMS=(growMemViews(),HEAP32)[timeoutMSPtr/4];promises.length=futureCount+1;promises[futureCount]=new Promise(resolve=>setTimeout(resolve,timeoutMS,0))}else{promises.length=futureCount}for(var i=0;i<futureCount;++i){var futureId=readI53FromI64(futurePtr+i*8);if(!(futureId in WebGPU.Internals.futures)){return futureId}promises[i]=WebGPU.Internals.futures[futureId]}const firstResolvedFuture=await Promise.race(promises);delete WebGPU.Internals.futures[firstResolvedFuture];return firstResolvedFuture})};_emwgpuWaitAny.isAsync=true;var ENV={};var getExecutableName=()=>thisProgram||"./this.program";var getEnvStrings=()=>{if(!getEnvStrings.strings){var lang=(typeof navigator=="object"&&navigator.language||"C").replace("-","_")+".UTF-8";var env={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:lang,_:getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x]}var strings=[];for(var x in env){strings.push(`${x}=${env[x]}`)}getEnvStrings.strings=strings}return getEnvStrings.strings};function _environ_get(__environ,environ_buf){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(14,0,1,__environ,environ_buf);__environ=bigintToI53Checked(__environ);environ_buf=bigintToI53Checked(environ_buf);var bufSize=0;var envp=0;for(var string of getEnvStrings()){var ptr=environ_buf+bufSize;(growMemViews(),HEAPU64)[(__environ+envp)/8]=BigInt(ptr);bufSize+=stringToUTF8(string,ptr,Infinity)+1;envp+=8}return 0}function _environ_sizes_get(penviron_count,penviron_buf_size){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(15,0,1,penviron_count,penviron_buf_size);penviron_count=bigintToI53Checked(penviron_count);penviron_buf_size=bigintToI53Checked(penviron_buf_size);var strings=getEnvStrings();(growMemViews(),HEAPU64)[penviron_count/8]=BigInt(strings.length);var bufSize=0;for(var string of strings){bufSize+=lengthBytesUTF8(string)+1}(growMemViews(),HEAPU64)[penviron_buf_size/8]=BigInt(bufSize);return 0}function _fd_close(fd){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(16,0,1,fd);try{var stream=SYSCALLS.getStreamFromFD(fd);FS.close(stream);return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}var doReadv=(stream,iov,iovcnt,offset)=>{var ret=0;for(var i=0;i<iovcnt;i++){var ptr=Number((growMemViews(),HEAPU64)[iov/8]);var len=Number((growMemViews(),HEAPU64)[(iov+8)/8]);iov+=16;var curr=FS.read(stream,(growMemViews(),HEAP8),ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len)break;if(typeof offset!="undefined"){offset+=curr}}return ret};function _fd_read(fd,iov,iovcnt,pnum){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(17,0,1,fd,iov,iovcnt,pnum);iov=bigintToI53Checked(iov);iovcnt=bigintToI53Checked(iovcnt);pnum=bigintToI53Checked(pnum);try{var stream=SYSCALLS.getStreamFromFD(fd);var num=doReadv(stream,iov,iovcnt);(growMemViews(),HEAPU64)[pnum/8]=BigInt(num);return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}function _fd_seek(fd,offset,whence,newOffset){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(18,0,1,fd,offset,whence,newOffset);offset=bigintToI53Checked(offset);newOffset=bigintToI53Checked(newOffset);try{if(isNaN(offset))return 61;var stream=SYSCALLS.getStreamFromFD(fd);FS.llseek(stream,offset,whence);(growMemViews(),HEAP64)[newOffset/8]=BigInt(stream.position);if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}var doWritev=(stream,iov,iovcnt,offset)=>{var ret=0;for(var i=0;i<iovcnt;i++){var ptr=Number((growMemViews(),HEAPU64)[iov/8]);var len=Number((growMemViews(),HEAPU64)[(iov+8)/8]);iov+=16;var curr=FS.write(stream,(growMemViews(),HEAP8),ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len){break}if(typeof offset!="undefined"){offset+=curr}}return ret};function _fd_write(fd,iov,iovcnt,pnum){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(19,0,1,fd,iov,iovcnt,pnum);iov=bigintToI53Checked(iov);iovcnt=bigintToI53Checked(iovcnt);pnum=bigintToI53Checked(pnum);try{var stream=SYSCALLS.getStreamFromFD(fd);var num=doWritev(stream,iov,iovcnt);(growMemViews(),HEAPU64)[pnum/8]=BigInt(num);return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}function _random_get(buffer,size){buffer=bigintToI53Checked(buffer);size=bigintToI53Checked(size);try{randomFill((growMemViews(),HEAPU8).subarray(buffer,buffer+size));return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}function _wgpuAdapterGetInfo(adapterPtr,info){adapterPtr=bigintToI53Checked(adapterPtr);info=bigintToI53Checked(info);var adapter=WebGPU.getJsObject(adapterPtr);WebGPU.fillAdapterInfoStruct(adapter.info,info);return 1}function _wgpuAdapterGetLimits(adapterPtr,limitsOutPtr){adapterPtr=bigintToI53Checked(adapterPtr);limitsOutPtr=bigintToI53Checked(limitsOutPtr);var adapter=WebGPU.getJsObject(adapterPtr);WebGPU.fillLimitStruct(adapter.limits,limitsOutPtr);return 1}function _wgpuAdapterHasFeature(adapterPtr,featureEnumValue){adapterPtr=bigintToI53Checked(adapterPtr);var adapter=WebGPU.getJsObject(adapterPtr);return adapter.features.has(WebGPU.FeatureName[featureEnumValue])}var _wgpuBufferGetSize=function(bufferPtr){bufferPtr=bigintToI53Checked(bufferPtr);var ret=(()=>{var buffer=WebGPU.getJsObject(bufferPtr);return buffer.size})();return BigInt(ret)};var _wgpuCommandEncoderBeginComputePass=function(encoderPtr,descriptor){encoderPtr=bigintToI53Checked(encoderPtr);descriptor=bigintToI53Checked(descriptor);var ret=(()=>{var desc;if(descriptor){desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),timestampWrites:WebGPU.makePassTimestampWrites(Number((growMemViews(),HEAPU64)[(descriptor+24)/8]))}}var commandEncoder=WebGPU.getJsObject(encoderPtr);var ptr=_emwgpuCreateComputePassEncoder(0n);WebGPU.Internals.jsObjectInsert(ptr,commandEncoder.beginComputePass(desc));return ptr})();return BigInt(ret)};function _wgpuCommandEncoderCopyBufferToBuffer(encoderPtr,srcPtr,srcOffset,dstPtr,dstOffset,size){encoderPtr=bigintToI53Checked(encoderPtr);srcPtr=bigintToI53Checked(srcPtr);srcOffset=bigintToI53Checked(srcOffset);dstPtr=bigintToI53Checked(dstPtr);dstOffset=bigintToI53Checked(dstOffset);size=bigintToI53Checked(size);var commandEncoder=WebGPU.getJsObject(encoderPtr);var src=WebGPU.getJsObject(srcPtr);var dst=WebGPU.getJsObject(dstPtr);commandEncoder.copyBufferToBuffer(src,srcOffset,dst,dstOffset,size)}var _wgpuCommandEncoderFinish=function(encoderPtr,descriptor){encoderPtr=bigintToI53Checked(encoderPtr);descriptor=bigintToI53Checked(descriptor);var ret=(()=>{var commandEncoder=WebGPU.getJsObject(encoderPtr);var ptr=_emwgpuCreateCommandBuffer(0n);WebGPU.Internals.jsObjectInsert(ptr,commandEncoder.finish());return ptr})();return BigInt(ret)};function _wgpuComputePassEncoderDispatchWorkgroups(passPtr,x,y,z){passPtr=bigintToI53Checked(passPtr);var pass=WebGPU.getJsObject(passPtr);pass.dispatchWorkgroups(x,y,z)}function _wgpuComputePassEncoderEnd(passPtr){passPtr=bigintToI53Checked(passPtr);var pass=WebGPU.getJsObject(passPtr);pass.end()}function _wgpuComputePassEncoderSetBindGroup(passPtr,groupIndex,groupPtr,dynamicOffsetCount,dynamicOffsetsPtr){passPtr=bigintToI53Checked(passPtr);groupPtr=bigintToI53Checked(groupPtr);dynamicOffsetCount=bigintToI53Checked(dynamicOffsetCount);dynamicOffsetsPtr=bigintToI53Checked(dynamicOffsetsPtr);var pass=WebGPU.getJsObject(passPtr);var group=WebGPU.getJsObject(groupPtr);if(dynamicOffsetCount==0){pass.setBindGroup(groupIndex,group)}else{pass.setBindGroup(groupIndex,group,(growMemViews(),HEAPU32),dynamicOffsetsPtr/4,dynamicOffsetCount)}}function _wgpuComputePassEncoderSetPipeline(passPtr,pipelinePtr){passPtr=bigintToI53Checked(passPtr);pipelinePtr=bigintToI53Checked(pipelinePtr);var pass=WebGPU.getJsObject(passPtr);var pipeline=WebGPU.getJsObject(pipelinePtr);pass.setPipeline(pipeline)}var _wgpuComputePipelineGetBindGroupLayout=function(pipelinePtr,groupIndex){pipelinePtr=bigintToI53Checked(pipelinePtr);var ret=(()=>{var pipeline=WebGPU.getJsObject(pipelinePtr);var ptr=_emwgpuCreateBindGroupLayout(0n);WebGPU.Internals.jsObjectInsert(ptr,pipeline.getBindGroupLayout(groupIndex));return ptr})();return BigInt(ret)};var _wgpuDeviceCreateBindGroup=function(devicePtr,descriptor){devicePtr=bigintToI53Checked(devicePtr);descriptor=bigintToI53Checked(descriptor);var ret=(()=>{function makeEntry(entryPtr){var bufferPtr=Number((growMemViews(),HEAPU64)[(entryPtr+16)/8]);var samplerPtr=Number((growMemViews(),HEAPU64)[(entryPtr+40)/8]);var textureViewPtr=Number((growMemViews(),HEAPU64)[(entryPtr+48)/8]);var externalTexturePtr=0;WebGPU.iterateExtensions(entryPtr,{327681:ptr=>{externalTexturePtr=Number((growMemViews(),HEAPU64)[(ptr+16)/8])}});var resource;if(bufferPtr){var size=readI53FromI64(entryPtr+32);if(size==-1)size=undefined;resource={buffer:WebGPU.getJsObject(bufferPtr),offset:readI53FromI64(entryPtr+24),size}}else{resource=WebGPU.getJsObject(samplerPtr||textureViewPtr||externalTexturePtr)}return{binding:(growMemViews(),HEAPU32)[(entryPtr+8)/4],resource}}function makeEntries(count,entriesPtrs){var entries=[];for(var i=0;i<count;++i){entries.push(makeEntry(entriesPtrs+56*i))}return entries}var desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8),layout:WebGPU.getJsObject(Number((growMemViews(),HEAPU64)[(descriptor+24)/8])),entries:makeEntries(Number((growMemViews(),HEAPU64)[(descriptor+32)/8]),Number((growMemViews(),HEAPU64)[(descriptor+40)/8]))};var device=WebGPU.getJsObject(devicePtr);var ptr=_emwgpuCreateBindGroup(0n);WebGPU.Internals.jsObjectInsert(ptr,device.createBindGroup(desc));return ptr})();return BigInt(ret)};var _wgpuDeviceCreateCommandEncoder=function(devicePtr,descriptor){devicePtr=bigintToI53Checked(devicePtr);descriptor=bigintToI53Checked(descriptor);var ret=(()=>{var desc;if(descriptor){desc={label:WebGPU.makeStringFromOptionalStringView(descriptor+8)}}var device=WebGPU.getJsObject(devicePtr);var ptr=_emwgpuCreateCommandEncoder(0n);WebGPU.Internals.jsObjectInsert(ptr,device.createCommandEncoder(desc));return ptr})();return BigInt(ret)};var _wgpuDeviceCreateComputePipeline=function(devicePtr,descriptor){devicePtr=bigintToI53Checked(devicePtr);descriptor=bigintToI53Checked(descriptor);var ret=(()=>{var desc=WebGPU.makeComputePipelineDesc(descriptor);var device=WebGPU.getJsObject(devicePtr);var ptr=_emwgpuCreateComputePipeline(0n);WebGPU.Internals.jsObjectInsert(ptr,device.createComputePipeline(desc));return ptr})();return BigInt(ret)};function _wgpuInstanceHasWGSLLanguageFeature(instance,featureEnumValue){instance=bigintToI53Checked(instance);if(!("wgslLanguageFeatures"in navigator.gpu)){return false}return navigator.gpu.wgslLanguageFeatures.has(WebGPU.WGSLLanguageFeatureName[featureEnumValue])}var _wgpuQueueSubmit=function(queuePtr,commandCount,commands){queuePtr=bigintToI53Checked(queuePtr);commandCount=bigintToI53Checked(commandCount);commands=bigintToI53Checked(commands);var queue=WebGPU.getJsObject(queuePtr);var cmds=Array.from((growMemViews(),HEAP64).subarray(commands/8,(commands+commandCount*8)/8),id=>WebGPU.getJsObject(id));queue.submit(cmds)};function _wgpuQueueWriteBuffer(queuePtr,bufferPtr,bufferOffset,data,size){queuePtr=bigintToI53Checked(queuePtr);bufferPtr=bigintToI53Checked(bufferPtr);bufferOffset=bigintToI53Checked(bufferOffset);data=bigintToI53Checked(data);size=bigintToI53Checked(size);var queue=WebGPU.getJsObject(queuePtr);var buffer=WebGPU.getJsObject(bufferPtr);var subarray=(growMemViews(),HEAPU8).subarray(data,data+size);queue.writeBuffer(buffer,bufferOffset,subarray,0,size)}var Asyncify={instrumentWasmImports(imports){var importPattern=/^(invoke_.*|__asyncjs__.*)$/;for(let[x,original]of Object.entries(imports)){if(typeof original=="function"){let isAsyncifyImport=original.isAsync||importPattern.test(x);if(isAsyncifyImport){imports[x]=original=new WebAssembly.Suspending(original)}}}},instrumentFunction(original){var wrapper=(...args)=>original(...args);return wrapper},instrumentWasmExports(exports){var exportPattern=/^(wllama_start|wllama_action|main|__main_argc_argv)$/;Asyncify.asyncExports=new Set;var ret={};for(let[x,original]of Object.entries(exports)){if(typeof original=="function"){let isAsyncifyExport=exportPattern.test(x);if(isAsyncifyExport){Asyncify.asyncExports.add(original);original=Asyncify.makeAsyncFunction(original)}var wrapper=Asyncify.instrumentFunction(original);ret[x]=wrapper}else{ret[x]=original}}return ret},asyncExports:null,isAsyncExport(func){return Asyncify.asyncExports?.has(func)},handleAsync:async startAsync=>{runtimeKeepalivePush();try{return await startAsync()}finally{runtimeKeepalivePop()}},handleSleep:startAsync=>Asyncify.handleAsync(()=>new Promise(startAsync)),makeAsyncFunction(original){return WebAssembly.promising(original)}};var getCFunc=ident=>{var func=Module["_"+ident];return func};var writeArrayToMemory=(array,buffer)=>{(growMemViews(),HEAP8).set(array,buffer)};var ccall=(ident,returnType,argTypes,args,opts)=>{var toC={pointer:p=>BigInt(p),string:str=>{var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=stringToUTF8OnStack(str)}return BigInt(ret)},array:arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return BigInt(ret)}};function convertReturnValue(ret){if(returnType==="string"){return UTF8ToString(Number(ret))}if(returnType==="pointer")return Number(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func(...cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}var asyncMode=opts?.async;if(asyncMode)return ret.then(onDone);ret=onDone(ret);return ret};var cwrap=(ident,returnType,argTypes,opts)=>{var numericArgs=!argTypes||argTypes.every(type=>type==="number"||type==="boolean");var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return(...args)=>ccall(ident,returnType,argTypes,args,opts)};var FS_createPath=(...args)=>FS.createPath(...args);var FS_unlink=(...args)=>FS.unlink(...args);var FS_createLazyFile=(...args)=>FS.createLazyFile(...args);var FS_createDevice=(...args)=>FS.createDevice(...args);PThread.init();FS.createPreloadedFile=FS_createPreloadedFile;FS.preloadFile=FS_preloadFile;FS.staticInit();{initMemory();if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(Module["preloadPlugins"])preloadPlugins=Module["preloadPlugins"];if(Module["print"])out=Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].shift()()}}}Module["ENV"]=ENV;Module["mmapAlloc"]=mmapAlloc;Module["wasmMemory"]=wasmMemory;Module["addRunDependency"]=addRunDependency;Module["removeRunDependency"]=removeRunDependency;Module["ccall"]=ccall;Module["cwrap"]=cwrap;Module["FS_preloadFile"]=FS_preloadFile;Module["FS_unlink"]=FS_unlink;Module["FS_createPath"]=FS_createPath;Module["FS_createDevice"]=FS_createDevice;Module["FS"]=FS;Module["FS_createDataFile"]=FS_createDataFile;Module["FS_createLazyFile"]=FS_createLazyFile;Module["MEMFS"]=MEMFS;var proxiedFunctionTable=[_proc_exit,exitOnMainThread,pthreadCreateProxied,___syscall_fcntl64,___syscall_fstat64,___syscall_getcwd,___syscall_getdents64,___syscall_ioctl,___syscall_lstat64,___syscall_newfstatat,___syscall_openat,___syscall_stat64,__mmap_js,__munmap_js,_environ_get,_environ_sizes_get,_fd_close,_fd_read,_fd_seek,_fd_write];function __asyncjs__js_file_read(path_ptr,offset,req_size,out_ptr){return Asyncify.handleAsync(async()=>await _wllama_js_file_read(UTF8ToString(Number(path_ptr)),Number(offset),Number(req_size),Number(out_ptr)))}__asyncjs__js_file_read.sig="jjjjj";var _malloc,_free,_wllama_malloc,_wllama_start,_wllama_action,_wllama_exit,_wllama_debug,_main,_emwgpuCreateBindGroup,_emwgpuCreateBindGroupLayout,_emwgpuCreateCommandBuffer,_emwgpuCreateCommandEncoder,_emwgpuCreateComputePassEncoder,_emwgpuCreateComputePipeline,_emwgpuCreateExternalTexture,_emwgpuCreatePipelineLayout,_emwgpuCreateQuerySet,_emwgpuCreateRenderBundle,_emwgpuCreateRenderBundleEncoder,_emwgpuCreateRenderPassEncoder,_emwgpuCreateRenderPipeline,_emwgpuCreateSampler,_emwgpuCreateSurface,_emwgpuCreateTexture,_emwgpuCreateTextureView,_emwgpuCreateAdapter,_emwgpuCreateBuffer,_emwgpuCreateDevice,_emwgpuCreateQueue,_emwgpuCreateShaderModule,_emwgpuOnDeviceLostCompleted,_emwgpuOnMapAsyncCompleted,_emwgpuOnRequestAdapterCompleted,_emwgpuOnRequestDeviceCompleted,_emwgpuOnWorkDoneCompleted,_emwgpuOnUncapturedError,__emscripten_tls_init,_pthread_self,_emscripten_builtin_memalign,__emscripten_thread_init,__emscripten_thread_crashed,__emscripten_run_js_on_main_thread,__emscripten_thread_free_data,__emscripten_thread_exit,__emscripten_check_mailbox,_memalign,___trap,_emscripten_stack_set_limits,__emscripten_stack_restore,__emscripten_stack_alloc,_emscripten_stack_get_current,__indirect_function_table,wasmTable;function assignWasmExports(wasmExports){_malloc=wasmExports["malloc"];_free=wasmExports["free"];_wllama_malloc=Module["_wllama_malloc"]=wasmExports["wllama_malloc"];_wllama_start=Module["_wllama_start"]=wasmExports["wllama_start"];_wllama_action=Module["_wllama_action"]=wasmExports["wllama_action"];_wllama_exit=Module["_wllama_exit"]=wasmExports["wllama_exit"];_wllama_debug=Module["_wllama_debug"]=wasmExports["wllama_debug"];_main=Module["_main"]=wasmExports["main"];_emwgpuCreateBindGroup=wasmExports["emwgpuCreateBindGroup"];_emwgpuCreateBindGroupLayout=wasmExports["emwgpuCreateBindGroupLayout"];_emwgpuCreateCommandBuffer=wasmExports["emwgpuCreateCommandBuffer"];_emwgpuCreateCommandEncoder=wasmExports["emwgpuCreateCommandEncoder"];_emwgpuCreateComputePassEncoder=wasmExports["emwgpuCreateComputePassEncoder"];_emwgpuCreateComputePipeline=wasmExports["emwgpuCreateComputePipeline"];_emwgpuCreateExternalTexture=wasmExports["emwgpuCreateExternalTexture"];_emwgpuCreatePipelineLayout=wasmExports["emwgpuCreatePipelineLayout"];_emwgpuCreateQuerySet=wasmExports["emwgpuCreateQuerySet"];_emwgpuCreateRenderBundle=wasmExports["emwgpuCreateRenderBundle"];_emwgpuCreateRenderBundleEncoder=wasmExports["emwgpuCreateRenderBundleEncoder"];_emwgpuCreateRenderPassEncoder=wasmExports["emwgpuCreateRenderPassEncoder"];_emwgpuCreateRenderPipeline=wasmExports["emwgpuCreateRenderPipeline"];_emwgpuCreateSampler=wasmExports["emwgpuCreateSampler"];_emwgpuCreateSurface=wasmExports["emwgpuCreateSurface"];_emwgpuCreateTexture=wasmExports["emwgpuCreateTexture"];_emwgpuCreateTextureView=wasmExports["emwgpuCreateTextureView"];_emwgpuCreateAdapter=wasmExports["emwgpuCreateAdapter"];_emwgpuCreateBuffer=wasmExports["emwgpuCreateBuffer"];_emwgpuCreateDevice=wasmExports["emwgpuCreateDevice"];_emwgpuCreateQueue=wasmExports["emwgpuCreateQueue"];_emwgpuCreateShaderModule=wasmExports["emwgpuCreateShaderModule"];_emwgpuOnDeviceLostCompleted=wasmExports["emwgpuOnDeviceLostCompleted"];_emwgpuOnMapAsyncCompleted=wasmExports["emwgpuOnMapAsyncCompleted"];_emwgpuOnRequestAdapterCompleted=wasmExports["emwgpuOnRequestAdapterCompleted"];_emwgpuOnRequestDeviceCompleted=wasmExports["emwgpuOnRequestDeviceCompleted"];_emwgpuOnWorkDoneCompleted=wasmExports["emwgpuOnWorkDoneCompleted"];_emwgpuOnUncapturedError=wasmExports["emwgpuOnUncapturedError"];__emscripten_tls_init=wasmExports["_emscripten_tls_init"];_pthread_self=wasmExports["pthread_self"];_emscripten_builtin_memalign=wasmExports["emscripten_builtin_memalign"];__emscripten_thread_init=wasmExports["_emscripten_thread_init"];__emscripten_thread_crashed=wasmExports["_emscripten_thread_crashed"];__emscripten_run_js_on_main_thread=wasmExports["_emscripten_run_js_on_main_thread"];__emscripten_thread_free_data=wasmExports["_emscripten_thread_free_data"];__emscripten_thread_exit=wasmExports["_emscripten_thread_exit"];__emscripten_check_mailbox=wasmExports["_emscripten_check_mailbox"];_memalign=wasmExports["memalign"];___trap=wasmExports["__trap"];_emscripten_stack_set_limits=wasmExports["emscripten_stack_set_limits"];__emscripten_stack_restore=wasmExports["_emscripten_stack_restore"];__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"];_emscripten_stack_get_current=wasmExports["emscripten_stack_get_current"];__indirect_function_table=wasmTable=wasmExports["__indirect_function_table"]}var wasmImports;function assignWasmImports(){wasmImports={__asyncjs__js_file_read,__pthread_create_js:___pthread_create_js,__syscall_fcntl64:___syscall_fcntl64,__syscall_getcwd:___syscall_getcwd,__syscall_getdents64:___syscall_getdents64,__syscall_ioctl:___syscall_ioctl,__syscall_openat:___syscall_openat,__syscall_stat64:___syscall_stat64,_abort_js:__abort_js,_emscripten_init_main_thread_js:__emscripten_init_main_thread_js,_emscripten_notify_mailbox_postmessage:__emscripten_notify_mailbox_postmessage,_emscripten_receive_on_main_thread_js:__emscripten_receive_on_main_thread_js,_emscripten_thread_cleanup:__emscripten_thread_cleanup,_emscripten_thread_mailbox_await:__emscripten_thread_mailbox_await,_emscripten_thread_set_strongref:__emscripten_thread_set_strongref,_localtime_js:__localtime_js,_mmap_js:__mmap_js,_munmap_js:__munmap_js,_tzset_js:__tzset_js,clock_time_get:_clock_time_get,emscripten_check_blocking_allowed:_emscripten_check_blocking_allowed,emscripten_date_now:_emscripten_date_now,emscripten_exit_with_live_runtime:_emscripten_exit_with_live_runtime,emscripten_get_callstack:_emscripten_get_callstack,emscripten_get_heap_max:_emscripten_get_heap_max,emscripten_get_now:_emscripten_get_now,emscripten_has_asyncify:_emscripten_has_asyncify,emscripten_num_logical_cores:_emscripten_num_logical_cores,emscripten_resize_heap:_emscripten_resize_heap,emwgpuAdapterRequestDevice:_emwgpuAdapterRequestDevice,emwgpuBufferDestroy:_emwgpuBufferDestroy,emwgpuBufferGetConstMappedRange:_emwgpuBufferGetConstMappedRange,emwgpuBufferMapAsync:_emwgpuBufferMapAsync,emwgpuBufferUnmap:_emwgpuBufferUnmap,emwgpuDelete:_emwgpuDelete,emwgpuDeviceCreateBuffer:_emwgpuDeviceCreateBuffer,emwgpuDeviceCreateShaderModule:_emwgpuDeviceCreateShaderModule,emwgpuDeviceDestroy:_emwgpuDeviceDestroy,emwgpuInstanceRequestAdapter:_emwgpuInstanceRequestAdapter,emwgpuQueueOnSubmittedWorkDone:_emwgpuQueueOnSubmittedWorkDone,emwgpuWaitAny:_emwgpuWaitAny,environ_get:_environ_get,environ_sizes_get:_environ_sizes_get,exit:_exit,fd_close:_fd_close,fd_read:_fd_read,fd_seek:_fd_seek,fd_write:_fd_write,memory:wasmMemory,random_get:_random_get,wgpuAdapterGetInfo:_wgpuAdapterGetInfo,wgpuAdapterGetLimits:_wgpuAdapterGetLimits,wgpuAdapterHasFeature:_wgpuAdapterHasFeature,wgpuBufferGetSize:_wgpuBufferGetSize,wgpuCommandEncoderBeginComputePass:_wgpuCommandEncoderBeginComputePass,wgpuCommandEncoderCopyBufferToBuffer:_wgpuCommandEncoderCopyBufferToBuffer,wgpuCommandEncoderFinish:_wgpuCommandEncoderFinish,wgpuComputePassEncoderDispatchWorkgroups:_wgpuComputePassEncoderDispatchWorkgroups,wgpuComputePassEncoderEnd:_wgpuComputePassEncoderEnd,wgpuComputePassEncoderSetBindGroup:_wgpuComputePassEncoderSetBindGroup,wgpuComputePassEncoderSetPipeline:_wgpuComputePassEncoderSetPipeline,wgpuComputePipelineGetBindGroupLayout:_wgpuComputePipelineGetBindGroupLayout,wgpuDeviceCreateBindGroup:_wgpuDeviceCreateBindGroup,wgpuDeviceCreateCommandEncoder:_wgpuDeviceCreateCommandEncoder,wgpuDeviceCreateComputePipeline:_wgpuDeviceCreateComputePipeline,wgpuInstanceHasWGSLLanguageFeature:_wgpuInstanceHasWGSLLanguageFeature,wgpuQueueSubmit:_wgpuQueueSubmit,wgpuQueueWriteBuffer:_wgpuQueueWriteBuffer}}function applySignatureConversions(wasmExports){wasmExports=Object.assign({},wasmExports);var makeWrapper_pp=f=>a0=>Number(f(BigInt(a0)));var makeWrapper__p=f=>a0=>f(BigInt(a0));var makeWrapper___PP=f=>(a0,a1,a2)=>f(a0,BigInt(a1?a1:0),BigInt(a2?a2:0));var makeWrapper_p=f=>()=>Number(f());var makeWrapper_ppp=f=>(a0,a1)=>Number(f(BigInt(a0),BigInt(a1)));var makeWrapper__p_____=f=>(a0,a1,a2,a3,a4,a5)=>f(BigInt(a0),a1,a2,a3,a4,a5);var makeWrapper___p_p_=f=>(a0,a1,a2,a3,a4)=>f(a0,BigInt(a1),a2,BigInt(a3),a4);var makeWrapper__pp=f=>(a0,a1)=>f(BigInt(a0),BigInt(a1));wasmExports["malloc"]=makeWrapper_pp(wasmExports["malloc"]);wasmExports["free"]=makeWrapper__p(wasmExports["free"]);wasmExports["main"]=makeWrapper___PP(wasmExports["main"]);wasmExports["pthread_self"]=makeWrapper_p(wasmExports["pthread_self"]);wasmExports["emscripten_builtin_memalign"]=makeWrapper_ppp(wasmExports["emscripten_builtin_memalign"]);wasmExports["_emscripten_thread_init"]=makeWrapper__p_____(wasmExports["_emscripten_thread_init"]);wasmExports["_emscripten_run_js_on_main_thread"]=makeWrapper___p_p_(wasmExports["_emscripten_run_js_on_main_thread"]);wasmExports["_emscripten_thread_free_data"]=makeWrapper__p(wasmExports["_emscripten_thread_free_data"]);wasmExports["_emscripten_thread_exit"]=makeWrapper__p(wasmExports["_emscripten_thread_exit"]);wasmExports["memalign"]=makeWrapper_ppp(wasmExports["memalign"]);wasmExports["emscripten_stack_set_limits"]=makeWrapper__pp(wasmExports["emscripten_stack_set_limits"]);wasmExports["_emscripten_stack_restore"]=makeWrapper__p(wasmExports["_emscripten_stack_restore"]);wasmExports["_emscripten_stack_alloc"]=makeWrapper_pp(wasmExports["_emscripten_stack_alloc"]);wasmExports["emscripten_stack_get_current"]=makeWrapper_p(wasmExports["emscripten_stack_get_current"]);return wasmExports}async function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,BigInt(argv));ret=await ret;exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){dependenciesFulfilled=run;return}if(ENVIRONMENT_IS_PTHREAD){initRuntime();return}preRun();if(runDependencies>0){dependenciesFulfilled=run;return}async function doRun(){Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();var noInitialRun=Module["noInitialRun"]||false;if(!noInitialRun)await callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}var wasmExports;if(!ENVIRONMENT_IS_PTHREAD){createWasm();run()}\n';

// src/worker.ts
var FILE_READ_REQ_EVENT = "fs.read_req";
var JSPI_STUB = `
if (!WebAssembly.Suspending) {
  // JSPI not available - stubs that keep the import/export tables valid.
  // Suspending wraps imports: identity is fine since async imports won't be called.
  WebAssembly.Suspending = function (fn) {
    // console.log(fn.toString());
    return fn;
  };
  // promising wraps exports: must return a Promise so ccall's ret.then() works.
  WebAssembly.promising = function (fn) {
    return function (...args) {
      try {
        return Promise.resolve(fn(...args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}
`;
var ProxyToWorker = class {
  // filename -> Blob for async reads
  constructor(resources, nbThread, suppressNativeLog, logger) {
    __publicField(this, "resources");
    __publicField(this, "logger");
    __publicField(this, "suppressNativeLog");
    __publicField(this, "taskQueue", []);
    __publicField(this, "taskId", 1);
    __publicField(this, "resultQueue", []);
    __publicField(this, "busy", false);
    // is the work loop is running?
    __publicField(this, "worker");
    __publicField(this, "multiThread");
    __publicField(this, "nbThread");
    __publicField(this, "useAsyncFile");
    __publicField(this, "fileBlobs", /* @__PURE__ */ new Map());
    this.resources = resources;
    this.nbThread = nbThread;
    this.multiThread = nbThread > 0;
    this.logger = logger;
    this.suppressNativeLog = suppressNativeLog;
    this.useAsyncFile = canUseAsyncFileRead(resources.compat);
  }
  getModuleCode() {
    return __async(this, null, function* () {
      if (!this.resources.jsPath) {
        if (this.resources.compat) {
          throw new Error(
            "compat mode is enabled but no jsPath was provided. Pass a worker JS via setCompat() or install @wllama/wllama-compat."
          );
        }
        return WLLAMA_EMSCRIPTEN_CODE;
      } else if (this.resources.jsPath.code) {
        return this.resources.jsPath.code;
      } else if (isString(this.resources.jsPath)) {
        const response = yield fetch(this.resources.jsPath);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch worker code from ${this.resources.jsPath}`
          );
        }
        return yield response.text();
      } else {
        throw new Error("No JS code provided for worker");
      }
    });
  }
  moduleInit(ggufFiles) {
    return __async(this, null, function* () {
      let moduleCode = JSPI_STUB + (yield this.getModuleCode());
      if (this.resources.noWebGPU) {
        moduleCode = 'try{Object.defineProperty(WorkerNavigator.prototype,"gpu",{get:()=>({requestAdapter:async()=>null})});}catch(e){}' + moduleCode;
      }
      let mainModuleCode = moduleCode.replace("var Module", "var ___Module");
      const runOptions = {
        pathConfig: {
          "wllama.wasm": this.resources.wasmPath
        },
        nbThread: this.nbThread,
        compat: this.resources.compat
      };
      const completeCode = [
        `const RUN_OPTIONS = ${JSON.stringify(runOptions)};`,
        `function wModuleInit() { ${mainModuleCode}; return Module; }`,
        LLAMA_CPP_WORKER_CODE
      ].join(";\n\n");
      this.worker = createWorker(completeCode);
      this.worker.onmessage = this.onRecvMsg.bind(this);
      this.worker.onerror = this.logger.error;
      const res = yield this.pushTask({
        verb: "module.init",
        args: [
          new Blob([moduleCode], { type: "text/javascript" }),
          this.useAsyncFile
        ],
        callbackId: this.taskId++
      });
      const nativeFiles = [];
      for (const file of ggufFiles) {
        const needAllocBuffer = !this.useAsyncFile;
        const id = yield this.fileAlloc(
          file.name,
          file.blob.size,
          needAllocBuffer
        );
        nativeFiles.push(__spreadValues({ id }, file));
        if (this.useAsyncFile) {
          this.fileBlobs.set(file.name, file.blob);
        }
      }
      if (!this.useAsyncFile) {
        yield Promise.all(
          nativeFiles.map((file) => {
            return this.fileWrite(file.id, file.blob);
          })
        );
      }
      return res;
    });
  }
  wllamaStart() {
    return __async(this, null, function* () {
      const result = yield this.pushTask({
        verb: "wllama.start",
        args: [],
        callbackId: this.taskId++
      });
      const parsedResult = this.parseResult(result);
      return parsedResult;
    });
  }
  wllamaAction(name, body) {
    return __async(this, null, function* () {
      const encodedMsg = glueSerialize(body);
      const result = yield this.pushTask({
        verb: "wllama.action",
        args: [name, encodedMsg],
        callbackId: this.taskId++
      });
      const parsedResult = glueDeserialize(result);
      return parsedResult;
    });
  }
  wllamaExit() {
    return __async(this, null, function* () {
      if (this.worker) {
        this.worker.terminate();
      }
    });
  }
  wllamaDebug() {
    return __async(this, null, function* () {
      const result = yield this.pushTask({
        verb: "wllama.debug",
        args: [],
        callbackId: this.taskId++
      });
      return JSON.parse(result);
    });
  }
  ///////////////////////////////////////
  /**
   * Allocate a new file in heapfs
   * @returns fileId, to be used by fileWrite()
   */
  fileAlloc(fileName, size, allocBuffer) {
    return __async(this, null, function* () {
      const result = yield this.pushTask({
        verb: "fs.alloc",
        args: [fileName, size, allocBuffer],
        callbackId: this.taskId++
      });
      return result.fileId;
    });
  }
  /**
   * Write a Blob to heapfs
   */
  fileWrite(fileId, blob) {
    return __async(this, null, function* () {
      const reader = blob.stream().getReader();
      let offset = 0;
      while (true) {
        const { done, value } = yield reader.read();
        if (done) break;
        const size = value.byteLength;
        yield this.pushTask(
          {
            verb: "fs.write",
            args: [fileId, value, offset],
            callbackId: this.taskId++
          },
          // @ts-ignore Type 'ArrayBufferLike' is not assignable to type 'ArrayBuffer'
          [value.buffer]
        );
        offset += size;
      }
    });
  }
  fileReadResponse(name, offset, size) {
    return __async(this, null, function* () {
      var _a;
      try {
        const blob = this.fileBlobs.get(name);
        if (!blob) {
          throw new Error(`blob not found for name="${name}"`);
        }
        const chunk = blob.slice(offset, offset + size);
        const buffer = yield chunk.arrayBuffer();
        this.worker.postMessage(
          { verb: "fs.read_res", args: [buffer] },
          { transfer: [buffer] }
        );
      } catch (err) {
        this.logger.error("fileReadResponse failed, terminating worker:", err);
        (_a = this.worker) == null ? void 0 : _a.terminate();
        this.worker = void 0;
        this.abort(`File read failed: ${err}`, err.stack || "");
      }
    });
  }
  /**
   * Parse JSON result returned by cpp code.
   * Throw new Error if "__exception" is present in the response
   *
   * TODO: get rid of this function once everything is migrated to Glue
   */
  parseResult(result) {
    const parsedResult = JSON.parse(result);
    if (parsedResult && parsedResult["error"]) {
      throw new WllamaRuntimeError("Unknown error, please see console.log", "");
    }
    return parsedResult;
  }
  /**
   * Push a new task to taskQueue
   */
  pushTask(param, buffers) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ resolve, reject, param, buffers });
      this.runTaskLoop();
    });
  }
  /**
   * Main loop for processing tasks
   */
  runTaskLoop() {
    return __async(this, null, function* () {
      var _a;
      if (this.busy) {
        return;
      }
      this.busy = true;
      while (true) {
        const task = this.taskQueue.shift();
        if (!task) break;
        this.resultQueue.push(task);
        this.worker.postMessage(
          task.param,
          isSafariMobile() ? void 0 : {
            transfer: (_a = task.buffers) != null ? _a : []
          }
        );
      }
      this.busy = false;
    });
  }
  /**
   * Handle messages from worker
   */
  onRecvMsg(e) {
    if (!e.data) return;
    const { verb, args } = e.data;
    const isCompatBuild = this.resources.compat;
    if (verb && verb.startsWith("console.")) {
      if (this.suppressNativeLog) {
        return;
      }
      if (verb.endsWith("debug")) this.logger.debug(...args);
      if (verb.endsWith("log")) this.logger.log(...args);
      if (verb.endsWith("warn")) this.logger.warn(...args);
      if (verb.endsWith("error")) this.logger.error(...args);
      return;
    } else if (verb === "signal.abort") {
      const [signalType, message, rawStack, originalErr] = args;
      if (originalErr) {
        this.logger.error(originalErr);
      }
      (() => __async(this, null, function* () {
        let stack = "";
        let newMsg = message.replace(
          "Build with -sASSERTIONS for more info.",
          ""
        );
        if (signalType === "abort") {
          newMsg = `(ABORT) ${newMsg}`;
          stack = rawStack.replace(/\|/g, "\n");
        } else if (signalType === "exception") {
          stack = rawStack;
        }
        const decoded = yield Debug.decodeStackTrace(stack, isCompatBuild);
        this.logger.error(`Stack trace (${signalType}):
` + decoded);
        this.abort(newMsg, decoded);
      }))();
      return;
    }
    if (verb === FILE_READ_REQ_EVENT) {
      const [name, offset, size] = args;
      this.fileReadResponse(name, offset, size).catch(() => {
      });
      return;
    }
    const { callbackId, result, err } = e.data;
    if (callbackId) {
      const idx = this.resultQueue.findIndex(
        (t) => t.param.callbackId === callbackId
      );
      if (idx !== -1) {
        const waitingTask = this.resultQueue.splice(idx, 1)[0];
        if (err) waitingTask.reject(err);
        else waitingTask.resolve(result);
      } else {
        this.logger.error(
          `Cannot find waiting task with callbackId = ${callbackId}`
        );
      }
    }
  }
  abort(text, stack) {
    const error = new WllamaRuntimeError(
      text.length == 0 ? "(unknown error)" : text,
      stack
    );
    while (this.resultQueue.length > 0) {
      const waitingTask = this.resultQueue.pop();
      if (!waitingTask) break;
      waitingTask.reject(error);
    }
    while (this.taskQueue.length > 0) {
      const pendingTask = this.taskQueue.pop();
      if (!pendingTask) break;
      pendingTask.reject(error);
    }
  }
};

// src/huggingface.ts
var HF_BASE = "https://huggingface.co";
var DEFAULT_QUANTS = ["Q4_K_M", "Q8_0"];
function fetchRepoFiles(repo, token) {
  return __async(this, null, function* () {
    var _a;
    const url = `${HF_BASE}/api/models/${repo}/tree/main?recursive=true`;
    const headers = { Accept: "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = yield fetch(url, { headers });
    if (!res.ok) {
      let msg = res.statusText;
      try {
        msg = (_a = (yield res.json()).error) != null ? _a : msg;
      } catch (e) {
      }
      throw new Error(`HF API error (${res.status}): ${msg}`);
    }
    return res.json();
  });
}
function firstShardPath(files, path) {
  const m = path.match(/^(.+)-(\d{5})-of-(\d{5})\.gguf$/i);
  if (!m) return path;
  const first = `${m[1]}-00001-of-${m[3]}.gguf`;
  return files.some((f) => f.path === first) ? first : path;
}
function selectFile(files, quant, mmprojOnly) {
  const candidates = files.filter((f) => {
    if (f.type !== "file" || !f.path.toLowerCase().endsWith(".gguf"))
      return false;
    const ismmproj = f.path.toLowerCase().includes("mmproj");
    return mmprojOnly ? ismmproj : !ismmproj;
  });
  if (candidates.length === 0) return null;
  if (quant) {
    const upper = quant.toUpperCase();
    const match = candidates.find((f) => f.path.toUpperCase().includes(upper));
    if (match) return firstShardPath(candidates, match.path);
    return null;
  }
  for (const q of DEFAULT_QUANTS) {
    const match = candidates.find((f) => f.path.toUpperCase().includes(q));
    if (match) return firstShardPath(candidates, match.path);
  }
  return firstShardPath(candidates, candidates[0].path);
}
function getHFModelSource(config) {
  return __async(this, null, function* () {
    const { repo, file, quant, mmprojFile, mmprojQuant, hfToken } = config;
    const files = yield fetchRepoFiles(repo, hfToken);
    const modelPath = file != null ? file : selectFile(files, quant, false);
    if (!modelPath) {
      throw new Error(`No GGUF file found in repo "${repo}"`);
    }
    const source = {
      url: `${HF_BASE}/${repo}/resolve/main/${modelPath}`
    };
    if (mmprojFile || mmprojQuant !== void 0) {
      const mmpath = mmprojFile != null ? mmprojFile : selectFile(files, mmprojQuant, true);
      if (mmpath) {
        source.mmprojUrl = `${HF_BASE}/${repo}/resolve/main/${mmpath}`;
      }
    }
    if (hfToken) {
      const params = new URLSearchParams({ token: hfToken });
      source.url += `?${params}`;
      if (source.mmprojUrl) {
        source.mmprojUrl += `?${params}`;
      }
    }
    return source;
  });
}
function getHFFileSHA256(url, headers) {
  return __async(this, null, function* () {
    if (!url.includes("/resolve/")) return void 0;
    const rawUrl = url.replace("/resolve/", "/raw/");
    try {
      const text = yield fetch(rawUrl, { headers }).then((r) => r.text());
      const match = text.match(/^oid sha256:([0-9a-f]{64})$/m);
      return match ? match[1] : void 0;
    } catch (e) {
      return void 0;
    }
  });
}

// src/storage/opfs.ts
var OPFSBackend = class {
  isSupported() {
    var _a;
    return typeof navigator !== "undefined" && "storage" in navigator && !!((_a = navigator.storage) == null ? void 0 : _a.getDirectory);
  }
  read(key) {
    return __async(this, null, function* () {
      try {
        const cacheDir = yield getCacheDir();
        const fileHandle = yield cacheDir.getFileHandle(key);
        return yield fileHandle.getFile();
      } catch (e) {
        return null;
      }
    });
  }
  write(key, stream) {
    return __async(this, null, function* () {
      const writable = yield openWritable(key);
      yield writable.truncate(0);
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = yield reader.read();
          if (done) break;
          yield writable.write(value);
        }
      } finally {
        yield writable.close();
      }
    });
  }
  getSize(key) {
    return __async(this, null, function* () {
      try {
        const cacheDir = yield getCacheDir();
        const fileHandle = yield cacheDir.getFileHandle(key);
        const file = yield fileHandle.getFile();
        return file.size;
      } catch (e) {
        return -1;
      }
    });
  }
  list() {
    return __async(this, null, function* () {
      const cacheDir = yield getCacheDir();
      const result = [];
      try {
        for (var iter = __forAwait(cacheDir.entries()), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const [name, handle] = temp.value;
          if (handle.kind === "file") {
            const file = yield handle.getFile();
            result.push({ key: name, size: file.size });
          }
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      return result;
    });
  }
  delete(key) {
    return __async(this, null, function* () {
      try {
        const cacheDir = yield getCacheDir();
        yield cacheDir.removeEntry(key);
      } catch (e) {
        if ((e == null ? void 0 : e.name) !== "NotFoundError") throw e;
      }
    });
  }
};
function getCacheDir() {
  return __async(this, null, function* () {
    const opfsRoot = yield navigator.storage.getDirectory();
    return opfsRoot.getDirectoryHandle("cache", { create: true });
  });
}
function openWritable(fileName) {
  return __async(this, null, function* () {
    const worker = createWorker(OPFS_UTILS_WORKER_CODE);
    let pResolve;
    let pReject;
    worker.onmessage = (e) => {
      if (e.data.ok) pResolve(null);
      else if (e.data.err) pReject(e.data.err);
    };
    worker.onerror = (e) => {
      var _a;
      return pReject == null ? void 0 : pReject((_a = e.message) != null ? _a : e);
    };
    const workerExec = (data) => new Promise((resolve, reject) => {
      pResolve = resolve;
      pReject = reject;
      worker.postMessage(
        data,
        isSafariMobile() ? void 0 : { transfer: "buf" in data && data.buf ? [data.buf.buffer] : [] }
      );
    });
    yield workerExec({ action: "open", filename: fileName });
    return {
      truncate: () => __async(this, null, function* () {
      }),
      write: (value) => workerExec({ action: "write", buf: value }),
      close: () => __async(this, null, function* () {
        yield workerExec({ action: "close" });
        worker.terminate();
      })
    };
  });
}

// src/storage/cos.ts
function makeHash(key) {
  return { algorithm: "SHA-256", value: key };
}
var COSInternalBackend = class {
  isSupported() {
    return typeof navigator !== "undefined" && "crossOriginStorage" in navigator;
  }
  // IMPORTANT: key must be SHA-256 hash of the data
  read(key) {
    return __async(this, null, function* () {
      try {
        const handle = yield navigator.crossOriginStorage.requestFileHandle(
          makeHash(key)
        );
        return handle.getFile();
      } catch (e) {
        return null;
      }
    });
  }
  // IMPORTANT: key must be SHA-256 hash of the data
  write(key, stream) {
    return __async(this, null, function* () {
      const handle = yield navigator.crossOriginStorage.requestFileHandle(
        makeHash(key),
        { create: true }
      );
      const writable = yield handle.createWritable();
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = yield reader.read();
          if (done) break;
          yield writable.write(value);
        }
      } finally {
        yield writable.close();
      }
    });
  }
  // IMPORTANT: key must be SHA-256 hash of the data
  getSize(key) {
    return __async(this, null, function* () {
      try {
        const handle = yield navigator.crossOriginStorage.requestFileHandle(
          makeHash(key)
        );
        const file = yield handle.getFile();
        return file.size;
      } catch (e) {
        return -1;
      }
    });
  }
  list() {
    return __async(this, null, function* () {
      throw new Error("not implemented");
    });
  }
  delete(_key) {
    return __async(this, null, function* () {
      throw new Error("not implemented");
    });
  }
};
var COSBackend = class {
  constructor() {
    __publicField(this, "cos", new COSInternalBackend());
    __publicField(this, "priv", new OPFSBackend());
  }
  isSupported() {
    return this.priv.isSupported();
  }
  read(key, hint) {
    return __async(this, null, function* () {
      if ((hint == null ? void 0 : hint.sha256) && this.cos.isSupported()) {
        const blob = yield this.cos.read(hint.sha256);
        if (blob) return blob;
      }
      return this.priv.read(key);
    });
  }
  write(key, stream, hint) {
    return __async(this, null, function* () {
      if ((hint == null ? void 0 : hint.sha256) && this.cos.isSupported()) {
        yield this.cos.write(hint.sha256, stream);
      } else {
        yield this.priv.write(key, stream);
      }
    });
  }
  getSize(key, hint) {
    return __async(this, null, function* () {
      if ((hint == null ? void 0 : hint.sha256) && this.cos.isSupported()) {
        const size = yield this.cos.getSize(hint.sha256);
        if (size !== -1) return size;
      }
      return this.priv.getSize(key);
    });
  }
  list() {
    return __async(this, null, function* () {
      return this.priv.list();
    });
  }
  delete(key) {
    return __async(this, null, function* () {
      return this.priv.delete(key);
    });
  }
};

// src/cache-manager.ts
var PREFIX_METADATA = "__metadata__";
var POLYFILL_ETAG = "polyfill_for_older_version";
function hintFromMetadata(metadata) {
  if (!metadata) return void 0;
  if (metadata.sha256) return { sha256: metadata.sha256 };
  return void 0;
}
var CacheManager = class {
  /**
   * @param backends Array of storage backends to use, in order of preference ; if first is available, use it, otherwise try the next one.
   */
  constructor(backends = [new COSBackend()]) {
    __publicField(this, "sb");
    for (const backend of backends) {
      if (backend.isSupported()) {
        this.sb = backend;
        return;
      }
    }
    throw new Error("No supported storage backend found");
  }
  /**
   * Convert a given URL into a storage key.
   *
   * Format: `${hashSHA1(fullURL)}_${fileName}`
   */
  getNameFromURL(url) {
    return __async(this, null, function* () {
      return urlToFileName(url, "");
    });
  }
  /**
   * @deprecated Use `download()` instead
   *
   * Write a new file to cache. This will overwrite existing file.
   *
   * @param name The file name returned by `getNameFromURL()` or `list()`
   */
  write(name, stream, metadata) {
    return __async(this, null, function* () {
      yield this.sb.write(name, stream);
      yield this.writeMetadata(name, metadata);
    });
  }
  download(_0) {
    return __async(this, arguments, function* (url, options = {}) {
      var _a, _b, _c, _d;
      const fileKey = yield urlToFileName(url, "");
      const sha256 = yield getHFFileSHA256(url, (_a = options.headers) != null ? _a : {});
      const hint = sha256 ? { sha256 } : void 0;
      const cachedSize = yield this.sb.getSize(fileKey, hint);
      if (cachedSize !== -1) {
        const metadata2 = yield this.readMetadata(fileKey);
        if ((metadata2 == null ? void 0 : metadata2.originalURL) === url && metadata2.originalSize === cachedSize) {
          return;
        }
        const head = yield fetch(url, __spreadValues({
          method: "HEAD"
        }, options.headers ? { headers: options.headers } : {}));
        const originalSize = parseInt(
          (_b = head.headers.get("content-length")) != null ? _b : "0",
          10
        );
        const etag2 = (head.headers.get("etag") || "").replace(
          /[^A-Za-z0-9]/g,
          ""
        );
        if (originalSize > 0 && originalSize === cachedSize) {
          yield this.writeMetadata(fileKey, __spreadValues({
            originalURL: url,
            originalSize,
            etag: etag2,
            sha256
          }, (_c = options.metadataAdditional) != null ? _c : {}));
          return;
        }
        yield this.sb.delete(fileKey);
        yield this.sb.delete(`${PREFIX_METADATA}${fileKey}`);
      }
      const response = yield fetch(url, __spreadValues(__spreadValues({}, options.headers ? { headers: options.headers } : {}), options.signal ? { signal: options.signal } : {}));
      if (!response.ok || !response.body) {
        throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
      }
      const contentLength = response.headers.get("content-length");
      const etag = (response.headers.get("etag") || "").replace(
        /[^A-Za-z0-9]/g,
        ""
      );
      const total = parseInt(contentLength != null ? contentLength : "0", 10);
      const progressCallback = options.progressCallback;
      let loaded = 0;
      let lastProgressAt = 0;
      const progressStream = new TransformStream({
        transform(chunk, controller) {
          loaded += chunk.byteLength;
          if (progressCallback) {
            const now = Date.now();
            if (now - lastProgressAt > 100) {
              lastProgressAt = now;
              progressCallback({ loaded, total });
            }
          }
          controller.enqueue(chunk);
        },
        flush() {
          progressCallback == null ? void 0 : progressCallback({ loaded, total: total || loaded });
        }
      });
      const metadata = __spreadValues({
        originalURL: url,
        originalSize: total,
        etag
      }, (_d = options.metadataAdditional) != null ? _d : {});
      if (sha256) {
        metadata.sha256 = sha256;
      }
      yield this.sb.write(
        fileKey,
        response.body.pipeThrough(progressStream),
        hint
      );
      yield this.writeMetadata(fileKey, metadata);
    });
  }
  /**
   * Open a file in cache for reading
   *
   * @param nameOrURL The file name returned by `getNameFromURL()` or `list()`, or the original URL of the remote file
   * @returns Blob, or null if file does not exist
   */
  open(nameOrURL) {
    return __async(this, null, function* () {
      const hint1 = hintFromMetadata(yield this.getMetadata(nameOrURL));
      const direct = yield this.sb.read(nameOrURL, hint1);
      if (direct) return direct;
      const key = yield urlToFileName(nameOrURL, "");
      const hint2 = hintFromMetadata(yield this.getMetadata(key));
      return this.sb.read(key, hint2);
    });
  }
  /**
   * Get the size of a file in stored cache
   *
   * NOTE: in case the download is stopped mid-way (i.e. user close browser tab), the file maybe corrupted, size maybe different from `metadata.originalSize`
   *
   * @param name The file name returned by `getNameFromURL()` or `list()`
   * @returns number of bytes, or -1 if file does not exist
   */
  getSize(name) {
    return __async(this, null, function* () {
      const hint = hintFromMetadata(yield this.getMetadata(name));
      return this.sb.getSize(name, hint);
    });
  }
  /**
   * Get metadata of a cached file
   */
  getMetadata(name) {
    return __async(this, null, function* () {
      const metadata = yield this.readMetadata(name);
      if (metadata) return metadata;
      const cachedSize = yield this.sb.getSize(name);
      return cachedSize > 0 ? (
        // files created by older version of wllama don't have metadata; polyfill it
        {
          etag: POLYFILL_ETAG,
          originalSize: cachedSize,
          originalURL: ""
        }
      ) : (
        // cached file not found
        null
      );
    });
  }
  /**
   * Same as `getMetadata()`, but without polyfill. Returns null if the file has no metadata.
   */
  readMetadata(name) {
    return __async(this, null, function* () {
      const blob = yield this.sb.read(`${PREFIX_METADATA}${name}`);
      if (!blob) return null;
      try {
        return yield new Response(blob).json();
      } catch (e) {
        return null;
      }
    });
  }
  /**
   * List all files currently in cache
   */
  list() {
    return __async(this, null, function* () {
      const all = yield this.sb.list();
      const metadataMap = {};
      for (const { key } of all) {
        if (key.startsWith(PREFIX_METADATA)) {
          const blob = yield this.sb.read(key);
          if (blob) {
            const meta = yield new Response(blob).json().catch(() => null);
            metadataMap[key.slice(PREFIX_METADATA.length)] = meta;
          }
        }
      }
      const result = [];
      for (const { key, size } of all) {
        if (!key.startsWith(PREFIX_METADATA)) {
          result.push({
            name: key,
            size,
            metadata: metadataMap[key] || {
              originalSize: size,
              originalURL: "",
              etag: ""
            }
          });
        }
      }
      return result;
    });
  }
  /**
   * Clear all files currently in cache
   */
  clear() {
    return __async(this, null, function* () {
      yield this.deleteMany(() => true);
    });
  }
  /**
   * Delete a single file in cache
   *
   * @param nameOrURL Can be either an URL or a name returned by `getNameFromURL()` or `list()`
   */
  delete(nameOrURL) {
    return __async(this, null, function* () {
      const name2 = yield this.getNameFromURL(nameOrURL);
      yield this.deleteMany(
        (entry) => entry.name === nameOrURL || entry.name === name2
      );
    });
  }
  /**
   * Delete multiple files in cache.
   *
   * @param predicate A predicate like `array.filter(item => boolean)`
   */
  deleteMany(predicate) {
    return __async(this, null, function* () {
      const list = yield this.list();
      for (const item of list) {
        if (predicate(item)) {
          yield this.sb.delete(item.name);
          yield this.sb.delete(`${PREFIX_METADATA}${item.name}`);
        }
      }
    });
  }
  /**
   * Write the metadata of the file to disk.
   */
  writeMetadata(name, metadata) {
    return __async(this, null, function* () {
      const blob = new Blob([JSON.stringify(metadata)], { type: "text/plain" });
      yield this.sb.write(`${PREFIX_METADATA}${name}`, blob.stream());
    });
  }
};
var cache_manager_default = CacheManager;
function urlToFileName(url, prefix) {
  return __async(this, null, function* () {
    const hashBuffer = yield crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(url)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return `${prefix}${hashHex}_${url.split("/").pop()}`;
  });
}

// src/model-manager.ts
var DEFAULT_PARALLEL_DOWNLOADS = 3;
var ModelValidationStatus = /* @__PURE__ */ ((ModelValidationStatus2) => {
  ModelValidationStatus2["VALID"] = "valid";
  ModelValidationStatus2["INVALID"] = "invalid";
  ModelValidationStatus2["DELETED"] = "deleted";
  return ModelValidationStatus2;
})(ModelValidationStatus || {});
var Model = class {
  constructor(modelManager, url, mmprojUrl, savedFiles) {
    __publicField(this, "modelManager");
    /**
     * URL to the GGUF file (in case it contains multiple shards, the URL should point to the first shard)
     *
     * This URL will be used to identify the model in the cache. There can't be 2 models with the same URL.
     */
    __publicField(this, "url");
    /**
     * URL to mmproj file, if exists
     */
    __publicField(this, "mmprojUrl");
    /**
     * Size in bytes (total size of all shards).
     *
     * A value of -1 means the model is deleted from the cache. You must call `ModelManager.downloadModel` to re-download the model.
     */
    __publicField(this, "size");
    /**
     * List of all shards in the cache, sorted by original URL (ascending order)
     */
    __publicField(this, "files");
    this.modelManager = modelManager;
    this.url = url;
    this.mmprojUrl = mmprojUrl;
    if (savedFiles) {
      this.files = this.getAllFiles(savedFiles);
      this.size = sumArr(this.files.map((f) => f.metadata.originalSize));
    } else {
      this.files = [];
      this.size = 0;
    }
  }
  /**
   * Open and get a list of all shards as Blobs
   */
  open() {
    return __async(this, null, function* () {
      if (this.size === -1) {
        throw new WllamaError(
          `Model is deleted from the cache; Call ModelManager.downloadModel to re-download the model`,
          "load_error"
        );
      }
      const blobs = [];
      for (const file of this.files) {
        const blob = yield this.modelManager.cacheManager.open(file.name);
        if (!blob) {
          throw new Error(
            `Failed to open file ${file.name}; Hint: the model may be invalid, please refresh it`
          );
        }
        blobs.push(blob);
      }
      return blobs;
    });
  }
  /**
   * Validate the model files.
   *
   * If the model is invalid, the model manager will not be able to use it. You must call `refresh` to re-download the model.
   *
   * Cases that model is invalid:
   * - The model is deleted from the cache
   * - The model files are missing (or the download is interrupted)
   */
  validate() {
    let nbShards = ModelManager.parseModelUrl(this.url).length;
    if (this.mmprojUrl) {
      nbShards += 1;
    }
    if (this.size === -1) {
      return "deleted" /* DELETED */;
    }
    if (this.size < 16 || this.files.length !== nbShards) {
      return "invalid" /* INVALID */;
    }
    for (const file of this.files) {
      if (!file.metadata || file.metadata.originalSize !== file.size) {
        return "invalid" /* INVALID */;
      }
    }
    return "valid" /* VALID */;
  }
  /**
   * In case the model is invalid, call this function to re-download the model
   */
  refresh() {
    return __async(this, arguments, function* (options = {}) {
      var _a;
      const urls = ModelManager.parseModelUrl(this.url);
      if (this.mmprojUrl) {
        urls.push(this.mmprojUrl);
      }
      const works = urls.map((url, index) => ({
        url,
        index
      }));
      this.modelManager.logger.debug("Downloading model files:", urls);
      const nParallel = (_a = this.modelManager.params.parallelDownloads) != null ? _a : DEFAULT_PARALLEL_DOWNLOADS;
      const totalSize = yield this.getTotalDownloadSize(urls);
      const loadedSize = [];
      const worker = () => __async(this, null, function* () {
        while (works.length > 0) {
          const w = works.shift();
          if (!w) break;
          yield this.modelManager.cacheManager.download(w.url, __spreadProps(__spreadValues({}, options), {
            metadataAdditional: {
              originalURL: w.url,
              mmprojURL: this.mmprojUrl
            },
            progressCallback: ({ loaded }) => {
              var _a2;
              loadedSize[w.index] = loaded;
              (_a2 = options.progressCallback) == null ? void 0 : _a2.call(options, {
                loaded: sumArr(loadedSize),
                total: totalSize
              });
            }
          }));
        }
      });
      const promises = [];
      for (let i = 0; i < nParallel; i++) {
        promises.push(worker());
        loadedSize.push(0);
      }
      yield Promise.all(promises);
      this.files = this.getAllFiles(yield this.modelManager.cacheManager.list());
      this.size = this.files.reduce((acc, f) => acc + f.metadata.originalSize, 0);
    });
  }
  /**
   * Remove the model from the cache
   */
  remove() {
    return __async(this, null, function* () {
      this.files = this.getAllFiles(yield this.modelManager.cacheManager.list());
      yield this.modelManager.cacheManager.deleteMany(
        (f) => !!this.files.find((file) => file.name === f.name)
      );
      this.size = -1;
    });
  }
  getAllFiles(savedFiles) {
    const allUrls = new Set(ModelManager.parseModelUrl(this.url));
    if (this.mmprojUrl) {
      allUrls.add(this.mmprojUrl);
    }
    const allFiles = [];
    for (const url of allUrls) {
      const file = savedFiles.find((f) => f.metadata.originalURL === url);
      if (!file) {
        throw new Error(`Model file not found: ${url}`);
      }
      allFiles.push(file);
    }
    allFiles.sort(
      (a, b) => a.metadata.originalURL.localeCompare(b.metadata.originalURL)
    );
    return allFiles;
  }
  getTotalDownloadSize(urls) {
    return __async(this, null, function* () {
      const responses = yield Promise.all(
        urls.map((url) => fetch(url, { method: "HEAD" }))
      );
      const sizes = responses.map(
        (res) => Number(res.headers.get("content-length") || "0")
      );
      return sumArr(sizes);
    });
  }
};
var ModelManager = class _ModelManager {
  constructor(params = {}) {
    // The CacheManager singleton, can be accessed by user
    __publicField(this, "cacheManager");
    __publicField(this, "params");
    __publicField(this, "logger");
    this.cacheManager = params.cacheManager || new cache_manager_default();
    this.params = params;
    this.logger = params.logger || console;
  }
  /**
   * Parses a model URL and returns an array of URLs based on the following patterns:
   * - If the input URL is an array, it returns the array itself.
   * - If the input URL is a string in the `gguf-split` format, it returns an array containing the URL of each shard in ascending order.
   * - Otherwise, it returns an array containing the input URL as a single element array.
   * @param modelUrl URL or list of URLs
   */
  static parseModelUrl(modelUrl) {
    var _a;
    if (Array.isArray(modelUrl)) {
      return modelUrl;
    }
    const urlPartsRegex = /-(\d{5})-of-(\d{5})\.gguf(?:\?.*)?$/;
    const queryMatch = modelUrl.match(/\.gguf(\?.*)?$/);
    const queryParams = (_a = queryMatch == null ? void 0 : queryMatch[1]) != null ? _a : "";
    const matches = modelUrl.match(urlPartsRegex);
    if (!matches) {
      return [modelUrl];
    }
    const baseURL = modelUrl.replace(urlPartsRegex, "");
    const total = matches[2];
    const paddedShardIds = Array.from(
      { length: Number(total) },
      (_, index) => (index + 1).toString().padStart(5, "0")
    );
    return paddedShardIds.map(
      (current) => `${baseURL}-${current}-of-${total}.gguf${queryParams}`
    );
  }
  /**
   * Get all models in the cache
   */
  getModels() {
    return __async(this, arguments, function* (opts = {}) {
      const cachedFiles = yield this.cacheManager.list();
      let models = [];
      for (const file of cachedFiles) {
        if (!file.metadata.originalURL) continue;
        const shards = _ModelManager.parseModelUrl(file.metadata.originalURL);
        const mmprojUrl = file.metadata.mmprojURL;
        const isFirstShard = shards.length === 1 || shards[0] === file.metadata.originalURL;
        if (isFirstShard) {
          models.push(
            new Model(this, file.metadata.originalURL, mmprojUrl, cachedFiles)
          );
        }
      }
      if (!opts.includeInvalid) {
        models = models.filter(
          (m) => m.validate() === "valid" /* VALID */
        );
      }
      return models;
    });
  }
  /**
   * Download a model from the given URL.
   *
   * The URL must end with `.gguf`
   */
  downloadModel(_0) {
    return __async(this, arguments, function* (sourceOrURL, options = {}) {
      const source = isString(sourceOrURL) ? { url: sourceOrURL } : sourceOrURL;
      if (!isValidGgufFile(source.url)) {
        throw new WllamaError(
          `Invalid model URL: ${source.url}; URL must ends with ".gguf"`,
          "download_error"
        );
      }
      const model = new Model(this, source.url, source.mmprojUrl);
      const validity = model.validate();
      if (validity !== "valid" /* VALID */) {
        yield model.refresh(options);
      }
      return model;
    });
  }
  /**
   * Get a model from the cache or download it if it's not available.
   */
  getModelOrDownload(_0) {
    return __async(this, arguments, function* (source, options = {}) {
      var _a;
      const models = yield this.getModels();
      const model = models.find((m) => m.url === source.url);
      if (model) {
        (_a = options.progressCallback) == null ? void 0 : _a.call(options, { loaded: model.size, total: model.size });
        return model;
      }
      return this.downloadModel(source, options);
    });
  }
  /**
   * Remove all models from the cache
   */
  clear() {
    return __async(this, null, function* () {
      yield this.cacheManager.clear();
    });
  }
};

// src/types/types.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["DEBUG"] = 1] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
  return LogLevel2;
})(LogLevel || {});

// src/wasm-from-cdn.ts
var WasmCompatFromCDN = {
  worker: "https://cdn.jsdelivr.net/npm/@wllama/wllama-compat@3.6.1/wasm/wllama.js",
  wasm: "https://cdn.jsdelivr.net/npm/@wllama/wllama-compat@3.6.1/wasm/wllama.wasm"
};

// src/wllama.ts
var LoggerWithoutDebug = __spreadProps(__spreadValues({}, console), {
  debug: () => {
  }
});
var WllamaError = class extends Error {
  constructor(message, type = "unknown_error") {
    super(message);
    __publicField(this, "type");
    this.type = type;
  }
};
var WllamaAbortError = class extends Error {
  constructor() {
    super("Operation aborted");
    __publicField(this, "name", "AbortError");
  }
};
var WllamaRuntimeError = class extends Error {
  constructor(message, stack) {
    super(message);
    __publicField(this, "name", "RuntimeError");
    __publicField(this, "stack");
    this.stack = stack;
  }
};
var Wllama = class {
  constructor(pathConfig, wllamaConfig = {}) {
    // The CacheManager and ModelManager are singleton, can be accessed by user
    __publicField(this, "cacheManager");
    __publicField(this, "modelManager");
    __publicField(this, "compat", null);
    __publicField(this, "proxy", null);
    __publicField(this, "config");
    __publicField(this, "pathConfig");
    __publicField(this, "useMultiThread", false);
    __publicField(this, "nbThreads", 1);
    __publicField(this, "useEmbeddings", false);
    __publicField(this, "useRerank", false);
    // available when loaded
    __publicField(this, "loadedContextInfo", null);
    __publicField(this, "seed");
    __publicField(this, "bosToken", -1);
    __publicField(this, "eosToken", -1);
    __publicField(this, "eotToken", -1);
    __publicField(this, "eogTokens", /* @__PURE__ */ new Set());
    __publicField(this, "addBosToken", false);
    __publicField(this, "addEosToken", false);
    __publicField(this, "mediaMarker");
    __publicField(this, "chatTemplate");
    __publicField(this, "metadata");
    __publicField(this, "hasEncoder", false);
    __publicField(this, "decoderStartToken", -1);
    // note: we overlay instead of using llama-server default_template_kwargs, because we cannot transfer complex data structure via GLUE
    // overlay allow mixed data type or nested structure for kwargs
    __publicField(this, "chatTemplateKwargs", {});
    var _a, _b, _c;
    checkEnvironmentCompatible();
    if (!pathConfig) throw new WllamaError("AssetsPathConfig is required");
    this.pathConfig = pathConfig;
    this.config = wllamaConfig;
    this.cacheManager = (_a = wllamaConfig.cacheManager) != null ? _a : new cache_manager_default();
    this.modelManager = (_c = wllamaConfig.modelManager) != null ? _c : new ModelManager({
      cacheManager: this.cacheManager,
      logger: (_b = wllamaConfig.logger) != null ? _b : console,
      parallelDownloads: wllamaConfig.parallelDownloads,
      allowOffline: wllamaConfig.allowOffline
    });
    this.setCompat("default");
  }
  logger() {
    var _a;
    return (_a = this.config.logger) != null ? _a : console;
  }
  checkModelLoaded() {
    if (!this.isModelLoaded()) {
      throw new WllamaError(
        "loadModel() is not yet called",
        "model_not_loaded"
      );
    }
  }
  /**
   * Get the libllama version string, e.g. "b6327-4d74393".
   *
   * @returns version string embedded at build time.
   */
  static getLibllamaVersion() {
    return LIBLLAMA_VERSION;
  }
  /**
   * Set compatibility options for Wllama.
   * @param compat Set to null to disable compatibility, or 'default' to use the default compat resources from CDN.
   * @param mode 'safari' by default; If set to 'firefox_safari', the compat mode will **also** be enabled on Firefox, which will significantly degrade the performance but allow using WebGPU on Firefox.
   */
  setCompat(compat, mode = "safari") {
    if (mode === "safari") {
      if (isFirefox()) {
        this.compat = null;
        return;
      }
    }
    this.compat = compat === "default" ? WasmCompatFromCDN : compat;
  }
  /**
   * Check if the model is loaded via `loadModel()`
   */
  isModelLoaded() {
    return !!this.proxy && !!this.metadata;
  }
  /**
   * Get token ID associated to BOS (begin of sentence) token.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns -1 if the model is not loaded.
   */
  getBOS() {
    return this.bosToken;
  }
  /**
   * Get token ID associated to EOS (end of sentence) token.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns -1 if the model is not loaded.
   */
  getEOS() {
    return this.eosToken;
  }
  /**
   * Get token ID associated to EOT (end of turn) token.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns -1 if the model is not loaded.
   */
  getEOT() {
    return this.eotToken;
  }
  /**
   * Check if a given token is end-of-generation token (e.g. EOS, EOT, etc.)
   *
   * @param token the token ID to be checked
   * @returns true if the token is EOS, EOT, or any other end-of-generation tokens
   */
  isTokenEOG(token) {
    return token === this.eosToken || token === this.eotToken || this.eogTokens.has(token);
  }
  /**
   * Get token ID associated to token used by decoder, to start generating output sequence(only usable for encoder-decoder architecture). In other words, encoder uses normal BOS and decoder uses this token.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns -1 if the model is not loaded.
   */
  getDecoderStartToken() {
    return this.decoderStartToken;
  }
  /**
   * Get model hyper-parameters and metadata
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns ModelMetadata
   */
  getModelMetadata() {
    this.checkModelLoaded();
    return this.metadata;
  }
  /**
   * Check if we're currently using multi-thread build.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns true if multi-thread is used.
   */
  isMultithread() {
    this.checkModelLoaded();
    return this.useMultiThread;
  }
  /**
   * Get number of threads used in the current context.
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns number of threads
   */
  getNumThreads() {
    this.checkModelLoaded();
    return this.useMultiThread ? this.nbThreads : 1;
  }
  /**
   * Check if the current model uses encoder-decoder architecture
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns true if multi-thread is used.
   */
  isEncoderDecoderArchitecture() {
    this.checkModelLoaded();
    return this.hasEncoder;
  }
  /**
   * Must we add BOS token to the tokenized sequence?
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns true if BOS token must be added to the sequence
   */
  mustAddBosToken() {
    this.checkModelLoaded();
    return this.addBosToken;
  }
  /**
   * Must we add EOS token to the tokenized sequence?
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns true if EOS token must be added to the sequence
   */
  mustAddEosToken() {
    this.checkModelLoaded();
    return this.addEosToken;
  }
  /**
   * Get the jinja chat template comes with the model. It only available if the original model (before converting to gguf) has the template in `tokenizer_config.json`
   *
   * NOTE: This can only being used after `loadModel` is called.
   *
   * @returns the jinja template. null if there is no template in gguf
   */
  getChatTemplate() {
    var _a;
    this.checkModelLoaded();
    return (_a = this.chatTemplate) != null ? _a : null;
  }
  /**
   * Check if WebGPU is supported by the current environment.
   * @returns true if WebGPU is supported
   */
  isSupportWebGPU() {
    return isSupportWebGPU();
  }
  /**
   * Load model from a given URL (or a list of URLs, in case the model is splitted into smaller files)
   * - If the model already been downloaded (via `downloadModel()`), then we will use the cached model
   * - Else, we download the model from internet
   * @param modelSourceOrURL
   * @param params
   */
  loadModelFromUrl(_0) {
    return __async(this, arguments, function* (modelSourceOrURL, params = {}) {
      var _a;
      const source = isString(modelSourceOrURL) ? { url: modelSourceOrURL } : modelSourceOrURL;
      const useCache = (_a = params.useCache) != null ? _a : true;
      const model = useCache ? yield this.modelManager.getModelOrDownload(source, params) : yield this.modelManager.downloadModel(source, params);
      const blobs = yield model.open();
      return yield this.loadModel(blobs, params);
    });
  }
  /**
   * Load model from a given Hugging Face model ID and file path.
   *
   * @param hfOptions
   * @param params
   */
  loadModelFromHF(_0) {
    return __async(this, arguments, function* (hfOptions, params = {}) {
      const source = yield getHFModelSource(hfOptions);
      return yield this.loadModelFromUrl(source, params);
    });
  }
  /**
   * Load model from a given list of Blob.
   *
   * You can pass multiple buffers into the function (in case the model contains multiple shards).
   *
   * @param ggufBlobsOrModel Can be either list of Blobs (in case you use local file), or a Model object (in case you use ModelManager)
   * @param params LoadModelParams
   */
  loadModel(_0) {
    return __async(this, arguments, function* (ggufBlobsOrModel, params = {}) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const blobs = ggufBlobsOrModel instanceof Model ? yield ggufBlobsOrModel.open() : [...ggufBlobsOrModel];
      if (blobs.some((b) => b.size === 0)) {
        throw new WllamaError(
          "Input model (or splits) must be non-empty Blob or File",
          "load_error"
        );
      }
      if (!this.pathConfig["default"]) {
        throw new WllamaError(
          '"default" is missing from pathConfig',
          "load_error"
        );
      }
      if (this.proxy) {
        throw new WllamaError("Module is already initialized", "load_error");
      }
      const supportMultiThread = yield isSupportMultiThread();
      const hwConccurency = Math.floor((navigator.hardwareConcurrency || 1) / 2);
      const nbThreads = (_a = params.n_threads) != null ? _a : hwConccurency;
      this.nbThreads = nbThreads;
      this.useMultiThread = supportMultiThread && nbThreads > 1;
      const workerResources = this.getWorkerResources();
      if (params.n_gpu_layers === 0) {
        workerResources.noWebGPU = true;
      }
      this.proxy = new ProxyToWorker(
        workerResources,
        this.useMultiThread ? nbThreads : 0,
        // 0 means disable pthread
        (_b = this.config.suppressNativeLog) != null ? _b : false,
        this.logger()
      );
      let logLevel = (_c = params.log_level) != null ? _c : 2 /* INFO */;
      if (this.config.suppressNativeLog) {
        logLevel = 9999;
      }
      const modelFiles = yield prepareBlobs(blobs);
      yield this.proxy.moduleInit(modelFiles.all);
      this.logger().debug("Calling wllamaStart...");
      const startResult = yield this.proxy.wllamaStart();
      if (!startResult.success) {
        throw new WllamaError(
          `Error while calling start function, result = ${startResult}`
        );
      }
      this.logger().debug("Loading model...");
      const loadResult = yield this.proxy.wllamaAction("load", {
        _name: "load_req",
        log_level: logLevel,
        // if async read is not supported, use mmap; refer to README-dev.md for more details
        use_mmap: !canUseAsyncFileRead(workerResources.compat),
        use_mlock: false,
        n_gpu_layers: (_d = params.n_gpu_layers) != null ? _d : 99999,
        n_ctx: (_e = params.n_ctx) != null ? _e : 1024,
        n_threads: this.useMultiThread ? nbThreads : 1,
        n_ctx_auto: false,
        // not supported for now
        mmproj_path: modelFiles.mmproj ? `/models/${MMPROJ_FILE_NAME}` : void 0,
        model_paths: modelFiles.llm.map((f) => `models/${f.name}`),
        embeddings: params.embeddings,
        offload_kqv: params.offload_kqv,
        n_batch: params.n_batch,
        n_ubatch: params.n_ubatch,
        pooling_type: params.pooling_type,
        rope_scaling_type: params.rope_scaling_type,
        rope_freq_base: params.rope_freq_base,
        rope_freq_scale: params.rope_freq_scale,
        yarn_ext_factor: params.yarn_ext_factor,
        yarn_attn_factor: params.yarn_attn_factor,
        yarn_beta_fast: params.yarn_beta_fast,
        yarn_beta_slow: params.yarn_beta_slow,
        yarn_orig_ctx: params.yarn_orig_ctx,
        cache_type_k: params.cache_type_k,
        cache_type_v: params.cache_type_v,
        // with unified KV, all sequences share one n_ctx cache, so each request can still use the full context
        n_parallel: (_f = params.n_parallel) != null ? _f : 4,
        kv_unified: (_g = params.kv_unified) != null ? _g : true,
        flash_attn: params.flash_attn,
        swa_full: params.swa_full,
        chat_template: params.chat_template,
        jinja: params.jinja,
        reasoning: params.reasoning,
        image_min_tokens: params.image_min_tokens,
        image_max_tokens: params.image_max_tokens,
        warmup: params.warmup,
        no_kv_offload: params.no_kv_offload,
        mmproj_offload: params.mmproj_offload,
        cont_batching: params.cont_batching,
        n_keep: params.n_keep,
        ctx_shift: params.ctx_shift,
        cache_idle_slots: params.cache_idle_slots,
        n_cache_reuse: params.n_cache_reuse,
        lora_paths: (_h = params.lora_adapters) == null ? void 0 : _h.map((a) => a.path),
        lora_scales: (_i = params.lora_adapters) == null ? void 0 : _i.map((a) => {
          var _a2;
          return (_a2 = a.scale) != null ? _a2 : 1;
        }),
        lora_init_without_apply: params.lora_init_without_apply,
        spec_draft_model: params.spec_draft_model,
        spec_draft_ngl: params.spec_draft_ngl,
        spec_draft_n_max: params.spec_draft_n_max,
        spec_draft_n_min: params.spec_draft_n_min,
        spec_draft_p_min: params.spec_draft_p_min,
        spec_draft_threads: params.spec_draft_threads,
        spec_draft_threads_batch: params.spec_draft_threads_batch,
        kv_overrides_keys: params.kv_overrides ? Object.keys(params.kv_overrides) : void 0,
        kv_overrides_vals: params.kv_overrides ? Object.values(params.kv_overrides) : void 0,
        reasoning_budget_tokens: params.reasoning_budget_tokens,
        reasoning_budget_message: params.reasoning_budget_message,
        reasoning_format: params.reasoning_format,
        skip_chat_parsing: params.skip_chat_parsing,
        prefill_assistant: params.prefill_assistant
      });
      const loadedCtxInfo = __spreadProps(__spreadValues({}, loadResult), {
        metadata: {}
      });
      for (let i = 0; i < loadResult.metadata_key.length; i++) {
        loadedCtxInfo.metadata[loadResult.metadata_key[i]] = loadResult.metadata_val[i];
      }
      this.seed = params.seed;
      this.bosToken = loadedCtxInfo.token_bos;
      this.eosToken = loadedCtxInfo.token_eos;
      this.eotToken = loadedCtxInfo.token_eot;
      this.useEmbeddings = !!params.embeddings;
      this.useRerank = params.pooling_type == "rank";
      this.metadata = {
        hparams: {
          nVocab: loadedCtxInfo.n_vocab,
          nCtxTrain: loadedCtxInfo.n_ctx_train,
          nEmbd: loadedCtxInfo.n_embd,
          nLayer: loadedCtxInfo.n_layer
        },
        meta: loadedCtxInfo.metadata
      };
      this.hasEncoder = !!loadedCtxInfo.has_encoder;
      this.decoderStartToken = loadedCtxInfo.token_decoder_start;
      this.addBosToken = loadedCtxInfo.add_bos_token;
      this.addEosToken = loadedCtxInfo.add_eos_token;
      this.chatTemplate = loadedCtxInfo.metadata["tokenizer.chat_template"];
      this.loadedContextInfo = loadedCtxInfo;
      this.eogTokens = new Set(loadedCtxInfo.list_tokens_eog);
      this.mediaMarker = loadedCtxInfo.media_marker;
      this.chatTemplateKwargs = (_j = params.default_template_kwargs) != null ? _j : {};
      this.logger().debug({ loadedCtxInfo });
    });
  }
  getLoadedContextInfo() {
    this.checkModelLoaded();
    if (!this.loadedContextInfo) {
      throw new WllamaError("Loaded context info is not available");
    }
    return __spreadValues({}, this.loadedContextInfo);
  }
  //////////////////////////////////////////////
  // High level API
  /**
   * Calculate embedding vector for a given text.
   * By default, BOS and EOS tokens will be added automatically. You can use the "skipBOS" and "skipEOS" option to disable it.
   * @param options OAI-compatible embedding creation options
   * @returns OAI-compatible embedding response
   */
  createEmbedding(options) {
    return __async(this, null, function* () {
      this.checkModelLoaded();
      if (!this.useEmbeddings) {
        throw new WllamaError(
          "Embeddings is not enabled. Please set it via LoadModelParams.embeddings"
        );
      }
      const result = yield this.proxy.wllamaAction(
        "embedding",
        {
          _name: "embd_req",
          data_json: JSON.stringify(options),
          files: []
          // TODO: support file input
        }
      );
      if (!result.success) {
        throw new WllamaError(
          "Model failed to start inference",
          "inference_error"
        );
      }
      return yield this.getResponse(options, false, result.req_id);
    });
  }
  /**
   * Rerank a list of documents against a query.
   * Requires the model to be loaded with embeddings: true and pooling_type: 'rank'.
   * @param options Reranking options (query, documents, top_n)
   * @returns Reranking response with relevance scores sorted highest first
   */
  createRerank(options) {
    return __async(this, null, function* () {
      var _a, _b;
      this.checkModelLoaded();
      if (!this.useEmbeddings || !this.useRerank) {
        throw new WllamaError(
          "Rerank is not enabled. Please set it via LoadModelParams: embeddings = true and pooling_type = rank"
        );
      }
      const top_n = (_a = options.top_n) != null ? _a : options.documents.length;
      let totalTokens = 0;
      const rawResults = [];
      for (let i = 0; i < options.documents.length; i++) {
        const result = yield this.proxy.wllamaAction("rerank", {
          _name: "rrnk_req",
          data_json: JSON.stringify({
            query: options.query,
            document: options.documents[i]
          })
        });
        if (!result.success) {
          throw new WllamaError(
            "Model failed to start reranking",
            "inference_error"
          );
        }
        const { score, tokens_evaluated } = yield this.getRerankResult(
          result.req_id
        );
        totalTokens += tokens_evaluated;
        rawResults.push({ index: i, score });
      }
      rawResults.sort((a, b) => b.score - a.score);
      return {
        model: (_b = this.getModelMetadata().meta["general.name"]) != null ? _b : "",
        object: "list",
        usage: { prompt_tokens: totalTokens, total_tokens: totalTokens },
        results: rawResults.slice(0, top_n).map(({ index, score }) => ({
          index,
          relevance_score: score
        }))
      };
    });
  }
  createChatCompletion(options) {
    return __async(this, null, function* () {
      var _a;
      if (Object.keys(this.chatTemplateKwargs).length > 0) {
        options = __spreadProps(__spreadValues({}, options), {
          chat_template_kwargs: __spreadValues(__spreadValues({}, this.chatTemplateKwargs), (_a = options.chat_template_kwargs) != null ? _a : {})
        });
      }
      if (options.stream && options.onData) {
        yield this.createCompletionImpl(options);
      } else if (options.stream) {
        return yield this.createCompletionGenerator(options);
      } else {
        return yield this.createCompletionImpl(__spreadProps(__spreadValues({}, options), { stream: false }));
      }
    });
  }
  createCompletion(options) {
    return __async(this, null, function* () {
      if (options.stream && options.onData) {
        yield this.createCompletionImpl(options);
      } else if (options.stream) {
        return yield this.createCompletionGenerator(options);
      } else {
        return yield this.createCompletionImpl(__spreadProps(__spreadValues({}, options), { stream: false }));
      }
    });
  }
  /**
   * Private implementation of createCompletion
   */
  createCompletionImpl(options) {
    return __async(this, null, function* () {
      this.checkModelLoaded();
      const isStream = !!options.stream;
      const isChat = !!options.messages;
      const customOpt = {};
      if (this.seed !== void 0) {
        customOpt.seed = this.seed;
      }
      let files = [];
      if (isChat) {
        const tmp = this.prepareMultimodalInput(
          options
        );
        options = tmp.params;
        files = tmp.files;
      }
      const result = yield this.proxy.wllamaAction(
        "completion",
        {
          _name: "cmpl_req",
          is_chat: isChat,
          data_json: JSON.stringify(__spreadValues(__spreadValues({}, options), customOpt)),
          files: files.map((f) => new Uint8Array(f))
        }
      );
      if (!result.success) {
        throw new WllamaError(
          "Model failed to start inference",
          "inference_error"
        );
      }
      return yield this.getResponse(
        options,
        isStream,
        result.req_id
      );
    });
  }
  /**
   * Same with `createCompletion`, but returns an async iterator instead.
   * Only called when stream=true and no onData is provided.
   */
  createCompletionGenerator(options) {
    return new Promise((resolve) => {
      const createGenerator = cbToAsyncIter(
        (callback) => {
          this.createCompletionImpl(__spreadProps(__spreadValues({}, options), {
            onData: (chunk) => callback(chunk)
          })).then(() => callback(void 0, true)).catch((err) => callback(void 0, false, err));
        }
      );
      resolve(createGenerator());
    });
  }
  /**
   * Whether the currently loaded model supports a specific input modality (e.g. image or audio).
   * @param modality
   * @returns
   */
  supportInputModality(modality) {
    this.checkModelLoaded();
    if (modality === "image") {
      return !!this.loadedContextInfo.has_image_input;
    } else if (modality === "audio") {
      return !!this.loadedContextInfo.has_audio_input;
    } else {
      throw new WllamaError(
        "Unsupported modality: " + modality,
        "unknown_error"
      );
    }
  }
  /**
   * Unload the model and free all memory.
   *
   * Note: This function will NOT crash if model is not yet loaded
   */
  exit() {
    return __async(this, null, function* () {
      var _a;
      yield (_a = this.proxy) == null ? void 0 : _a.wllamaExit();
      this.proxy = null;
    });
  }
  /**
   * [FOR DEBUGGING ONLY] Run ggml backend ops tests without loading any model.
   *
   * Initializes the wasm runtime, executes `test-backend-ops` with the given args, then shuts down.
   *
   * For more info, please refer to guides/debug.md
   *
   * @param args Arguments forwarded to test-backend-ops (e.g. ["-o", "ADD"])
   * @returns retcode (0 = all tests passed) and success flag
   */
  testBackendOps() {
    return __async(this, arguments, function* (args = []) {
      var _a;
      if (!this.pathConfig["default"]) {
        throw new WllamaError(
          '"default" is missing from pathConfig',
          "load_error"
        );
      }
      if (!(yield isSupportMultiThread())) {
        throw new WllamaError(
          "Multi-threading is required to run backend ops tests, but it is not supported in the current environment."
        );
      }
      const tmpProxy = new ProxyToWorker(
        this.getWorkerResources(),
        0,
        // single-thread; no model needed
        (_a = this.config.suppressNativeLog) != null ? _a : false,
        this.logger()
      );
      try {
        yield tmpProxy.moduleInit([]);
        const startResult = yield tmpProxy.wllamaStart();
        if (!startResult.success) {
          throw new WllamaError(
            `Error while calling start function, result = ${startResult}`
          );
        }
        const result = yield tmpProxy.wllamaAction(
          "test_backend_ops",
          { _name: "tbop_req", args: ["test-backend-ops", ...args] }
        );
        return { retcode: result.retcode, success: result.success };
      } finally {
        yield tmpProxy.wllamaExit();
      }
    });
  }
  //////////////////////////////////////////////
  // Low level API
  // TODO: add back
  /**
   * get debug info
   */
  _getDebugInfo() {
    return __async(this, null, function* () {
      this.checkModelLoaded();
      return yield this.proxy.wllamaDebug();
    });
  }
  //////////////////////////////////////////////
  // Utils
  jsonDecode(data_json) {
    try {
      return JSON.parse(data_json);
    } catch (e) {
      this.logger().error("Failed to parse JSON:", data_json);
      throw new WllamaError("Failed to parse model output", "inference_error");
    }
  }
  prepareMultimodalInput(params) {
    const msg = params.messages;
    const msgNew = [];
    const files = [];
    for (const m of msg) {
      if (Array.isArray(m.content)) {
        const newContent = [];
        for (const c of m.content) {
          if (c.type === "text") {
            newContent.push(c);
          } else {
            if (!this.mediaMarker) {
              throw new WllamaError(
                "Media marker is undefined",
                "inference_error"
              );
            }
            files.push(c.data);
            newContent.push({
              type: "text",
              text: this.mediaMarker
            });
          }
        }
        msgNew.push(__spreadProps(__spreadValues({}, m), {
          content: newContent
        }));
      } else {
        msgNew.push(m);
      }
    }
    return {
      params: __spreadProps(__spreadValues({}, params), {
        messages: msgNew
      }),
      files
    };
  }
  // release the slot occupied by the request; cancelling an already-finished request is a no-op
  cancelRequest(reqId) {
    return __async(this, null, function* () {
      try {
        yield this.proxy.wllamaAction("cancel", {
          _name: "cncl_req",
          req_id: reqId
        });
      } catch (e) {
        this.logger().warn("Failed to cancel request", reqId, e);
      }
    });
  }
  getRerankResult(reqId) {
    return __async(this, null, function* () {
      let completed = false;
      try {
        while (true) {
          const chunk = yield this.proxy.wllamaAction(
            "get_result",
            { _name: "gres_req", req_id: reqId }
          );
          const jsonString = chunk.data_json;
          if (jsonString && jsonString.length > 0) {
            if (chunk.is_error) {
              const jsonData = this.jsonDecode(jsonString);
              throw new WllamaError(
                jsonData.message || "Unknown reranking error",
                "inference_error"
              );
            }
            completed = true;
            return this.jsonDecode(jsonString);
          }
          if (!chunk.has_more) {
            completed = true;
            break;
          }
        }
        throw new WllamaError("No reranking result received", "inference_error");
      } finally {
        if (!completed) {
          yield this.cancelRequest(reqId);
        }
      }
    });
  }
  getResponse(options, isStream, reqId) {
    return __async(this, null, function* () {
      var _a, _b;
      let finalResult = null;
      let completed = false;
      try {
        while (true) {
          if ((_a = options.abortSignal) == null ? void 0 : _a.aborted) {
            throw new WllamaAbortError();
          }
          const result_chunk = yield this.proxy.wllamaAction(
            "get_result",
            {
              _name: "gres_req",
              req_id: reqId
            }
          );
          const jsonString = result_chunk.data_json;
          if (!jsonString || jsonString.length === 0) {
            if (!result_chunk.has_more) {
              completed = true;
              break;
            } else {
              continue;
            }
          }
          if (jsonString == "null") {
            continue;
          }
          let jsonData = this.jsonDecode(jsonString);
          finalResult = jsonData;
          if (result_chunk.is_error) {
            this.logger().error("Model returned an error:", jsonData);
            throw new WllamaError(
              jsonData.message || "Unknown inference error",
              "inference_error"
            );
          }
          if (isStream) {
            if (!Array.isArray(jsonData)) {
              jsonData = [jsonData];
            }
            for (const chunk of jsonData) {
              (_b = options.onData) == null ? void 0 : _b.call(options, chunk);
              finalResult = chunk;
            }
          }
          if (!result_chunk.has_more) {
            completed = true;
            break;
          }
        }
      } finally {
        if (!completed) {
          yield this.cancelRequest(reqId);
        }
      }
      return finalResult;
    });
  }
  getWorkerResources() {
    const workerResources = {
      wasmPath: absoluteUrl(this.pathConfig["default"]),
      compat: false
    };
    if (needCompat()) {
      if (!this.compat) {
        this.logger().warn(
          "Not using compat mode" + (isFirefox() ? " (expected on Firefox - WebGPU will be disabled)" : "")
        );
      } else {
        const isUsingDefault = this.compat.worker === WasmCompatFromCDN.worker && this.compat.wasm === WasmCompatFromCDN.wasm;
        if (isUsingDefault) {
          this.logger().warn(
            "Compatibility mode is activated, using resources from CDN. To use local resources, please refer to @wllama/wllama-compat package."
          );
          this.logger().warn(
            "IMPORTANT: Performance will be significantly degraded in compatibility mode."
          );
        }
        workerResources.wasmPath = absoluteUrl(this.compat.wasm);
        workerResources.jsPath = this.compat.worker;
        workerResources.compat = true;
      }
    }
    if (isFirefox()) {
      if (workerResources.compat) {
        this.logger().warn(
          'Using compat mode on Firefox, performance will be significantly degraded; Consider enabling "javascript.options.wasm_js_promise_integration" in "about:config".'
        );
      } else if (!isSupportJSPI()) {
        this.logger().warn(
          'WebGPU is disabled on Firefox due to missing JSPI support. Please consider enabling compat mode, or enabling "javascript.options.wasm_js_promise_integration" in "about:config".'
        );
      }
    }
    return workerResources;
  }
};
export {
  CacheManager,
  LogLevel,
  LoggerWithoutDebug,
  Model,
  ModelManager,
  ModelValidationStatus,
  POLYFILL_ETAG,
  Wllama,
  WllamaAbortError,
  WllamaError,
  WllamaRuntimeError,
  getHFFileSHA256,
  getHFModelSource,
  isValidGgufFile
};
