import { definePanel } from '@directus/extensions-sdk';
import { resolveComponent, openBlock, createElementBlock, createVNode, createElementVNode, defineComponent, ref, watch, computed, onMounted, onBeforeUnmount, Fragment, createCommentVNode, normalizeClass, withCtx, createBlock, toDisplayString, renderList, createTextVNode, pushScopeId, popScopeId, defineAsyncComponent, unref } from 'vue';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$1 = "\n.loading {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  width: 100%;\n  height: 100%;\n}\n";
n(css$1,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$2 = {};

const _hoisted_1$1 = { class: "loading" };
const _hoisted_2$1 = /*#__PURE__*/createElementVNode("span", null, "Connecting to Spotify...", -1 /* HOISTED */);

function _sfc_render(_ctx, _cache) {
  const _component_v_progress_circular = resolveComponent("v-progress-circular");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_v_progress_circular, {
      large: "",
      indeterminate: ""
    }),
    _hoisted_2$1
  ]))
}
var PlayerLoading = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render],['__file',"player-loading.vue"]]);

const _withScopeId = (n) => (pushScopeId("data-v-bc134c2f"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "nowplaying__image" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "nowplaying__detail" };
const _hoisted_5 = ["href"];
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode(
  "p",
  null,
  "Volume Slider:",
  -1
  /* HOISTED */
));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode(
  "span",
  { class: "sr-only" },
  "Volume Toggle",
  -1
  /* HOISTED */
));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode(
  "p",
  null,
  "Audio Track Slider:",
  -1
  /* HOISTED */
));
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "player",
  props: {
    player: {},
    defaultVolume: {},
    allowControls: { type: Boolean }
  },
  setup(__props) {
    const { player, defaultVolume, allowControls } = __props;
    const audioTrack = ref(0);
    watch(audioTrack, (newValue) => {
      player.seek(newValue).then(() => {
        console.log("Audio Seek updated!");
      });
    });
    const volume = ref(defaultVolume);
    watch(volume, (newValue) => {
      player.setVolume(newValue).then(() => {
        console.log("Volume updated!");
      });
    });
    const volumeIcon = computed(() => {
      if (volume.value === 0)
        return "volume_off";
      if (volume.value < 0.2)
        return "volume_mute";
      if (volume.value < 0.7)
        return "volume_down";
      return "volume_up";
    });
    const state = ref();
    const currentTrack = ref();
    function updatePlayingState(data) {
      var _a, _b, _c;
      console.log("updatestate", data);
      state.value = { ...data };
      audioTrack.value = ((_a = state.value) == null ? void 0 : _a.position) || 0;
      currentTrack.value = (_c = (_b = state.value) == null ? void 0 : _b.track_window) == null ? void 0 : _c.current_track;
    }
    onMounted(() => {
      console.log("Mounted");
      player.addListener("player_state_changed", updatePlayingState);
      player.getCurrentState().then(updatePlayingState);
    });
    onBeforeUnmount(() => {
      console.log("Un Mounted");
      player.removeListener("player_state_changed", updatePlayingState);
    });
    player.on("playback_error", ({ message }) => {
      console.error("Failed to perform playback", message);
    });
    return (_ctx, _cache) => {
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_button = resolveComponent("v-button");
      const _component_v_slider = resolveComponent("v-slider");
      return openBlock(), createElementBlock("div", null, [
        !_ctx.player ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_v_progress_circular, {
            large: "",
            indeterminate: ""
          })
        ])) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(' <div v-if="!isActive">\n      <p>\n        We are ready to start playing music!\n      </p>\n      <p>\n        Please use the spotify app to transfer the music over to Directus.\n      </p>\n    </div> '),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["cards", { "has-header": _ctx.showHeader }])
              },
              [
                createVNode(_component_v_card, { class: "nowplaying" }, {
                  default: withCtx(() => {
                    var _a, _b, _c, _d, _e, _f;
                    return [
                      createElementVNode("div", _hoisted_2, [
                        currentTrack.value ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          src: (_d = (_c = (_b = (_a = currentTrack.value) == null ? void 0 : _a.album) == null ? void 0 : _b.images) == null ? void 0 : _c.find((img) => (img == null ? void 0 : img.size) === "SMALL")) == null ? void 0 : _d.url
                        }, null, 8, _hoisted_3)) : (openBlock(), createBlock(_component_v_icon, {
                          key: 1,
                          name: "signal_disconnected",
                          large: ""
                        }))
                      ]),
                      createElementVNode("div", _hoisted_4, [
                        createElementVNode(
                          "div",
                          null,
                          toDisplayString(((_e = currentTrack.value) == null ? void 0 : _e.name) || "Spotify Disconnected"),
                          1
                          /* TEXT */
                        ),
                        createElementVNode("div", null, [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(((_f = currentTrack.value) == null ? void 0 : _f.artists) || [], (artist) => {
                              return openBlock(), createElementBlock(
                                Fragment,
                                null,
                                [
                                  createElementVNode("a", {
                                    href: artist.url
                                  }, toDisplayString(artist.name), 9, _hoisted_5),
                                  createTextVNode(", ")
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              );
                            }),
                            256
                            /* UNKEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }),
                currentTrack.value ? (openBlock(), createBlock(_component_v_card, {
                  key: 0,
                  class: "controls"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_button, {
                      class: "btn-action",
                      "x-small": "",
                      icon: "",
                      rounded: "",
                      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.player.previousTrack())
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_icon, { name: "skip_previous" })
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_v_button, {
                      class: "btn-action",
                      icon: "",
                      rounded: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_icon, {
                          name: "play_pause",
                          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.player.togglePlay())
                        }),
                        createCommentVNode(" pause / play_arrow")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_v_button, {
                      class: "btn-action",
                      "x-small": "",
                      icon: "",
                      rounded: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_icon, {
                          name: "skip_next",
                          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.player.nextTrack())
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true),
                currentTrack.value ? (openBlock(), createBlock(_component_v_card, {
                  key: 1,
                  style: { "display": "flex", "width": "100%" }
                }, {
                  default: withCtx(() => [
                    _hoisted_6,
                    createVNode(_component_v_icon, {
                      name: volumeIcon.value,
                      left: "",
                      clickable: "",
                      large: ""
                    }, {
                      default: withCtx(() => [
                        _hoisted_7
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["name"]),
                    createVNode(_component_v_slider, {
                      "aria-label": "Volume Slider",
                      disabled: false,
                      max: 1,
                      min: 0,
                      step: 0.01,
                      modelValue: volume.value,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => volume.value = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true),
                currentTrack.value ? (openBlock(), createBlock(_component_v_card, {
                  key: 2,
                  style: { "display": "flex", "width": "100%" }
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      _hoisted_8,
                      createVNode(_component_v_slider, {
                        "aria-label": "Audio Track Slider",
                        disabled: false,
                        max: state.value.duration,
                        min: 0,
                        step: ((_a = currentTrack.value) == null ? void 0 : _a.duration_ms) / 6e4 * 60,
                        modelValue: audioTrack.value,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => audioTrack.value = $event)
                      }, null, 8, ["max", "step", "modelValue"])
                    ];
                  }),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ]);
    };
  }
});

var css = "\n.text[data-v-bc134c2f] {\n\tpadding: 12px;\n}\n.text.has-header[data-v-bc134c2f] {\n\tpadding: 0 12px;\n}\n.sr-only[data-v-bc134c2f] {\n\tvisibility: hidden;\n}\n.cards[data-v-bc134c2f]  {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n}\n.controls[data-v-bc134c2f] {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: space-between;\n  padding: 1rem;\n}\n.nowplaying[data-v-bc134c2f] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n}\n.nowplaying__image[data-v-bc134c2f] {\n  width:64px; \n  height:64px;\n  background: var(--background-normal-alt);\n  border-radius: 5px;\n\n  overflow: hidden;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.nowplaying__detail[data-v-bc134c2f] {\n  display: flex;\n  flex-direction: column;\n}\n";
n(css,{});

var PlayerComponentX = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bc134c2f"], ["__file", "player.vue"]]);

var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel",
  props: {
    showHeader: { type: Boolean },
    apiToken: {},
    streamName: {},
    allowControls: { type: Boolean },
    defaultVolume: {}
  },
  setup(__props) {
    const props = __props;
    let spotifyPlayer = ref();
    const rootComponent = ref();
    const PlayerComponent = defineAsyncComponent({
      loader: () => {
        return new Promise((resolve, reject) => {
          if (window.activeSpotify) {
            spotifyPlayer.value = window.activeSpotify;
            return resolve(PlayerComponentX);
          }
          if (!props.apiToken) {
            reject("Missing Spotify API Token");
          }
          watch(rootComponent, () => {
            if (!document.getElementById("spotify-script")) {
              var scriptTag = document.createElement("script");
              scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
              scriptTag.id = "spotify-script";
            }
            rootComponent.value.appendChild(scriptTag);
          });
          window.onSpotifyWebPlaybackSDKReady = () => {
            spotifyPlayer.value = window.activeSpotify = new Spotify.Player({
              name: props.streamName,
              getOAuthToken: (cb) => {
                cb(props.apiToken);
              },
              volume: props.defaultVolume / 100
            });
            const errorHandler = ({ message: message2 }) => {
              console.error("initialization_error", message2);
              reject(message2);
            };
            spotifyPlayer.value.addListener("not_ready", ({ device_id }) => {
              console.log("Device ID has gone offline", device_id);
              reject("Unable to connect to device");
            });
            spotifyPlayer.value.addListener("initialization_error", errorHandler);
            spotifyPlayer.value.addListener("authentication_error", errorHandler);
            spotifyPlayer.value.addListener("account_error", errorHandler);
            spotifyPlayer.value.addListener("autoplay_failed", () => {
              console.log("Autoplay is not allowed by the browser autoplay rules");
              reject(message);
            });
            spotifyPlayer.value.connect().then((success) => {
              if (success) {
                console.log("The Web Playback SDK successfully connected to Spotify!");
              }
            });
            spotifyPlayer.value.addListener("ready", ({ device_id }) => {
              console.log("Ready with Device ID", device_id);
              resolve(PlayerComponentX);
            });
          };
        });
      },
      // A component to use while the async component is loading
      loadingComponent: PlayerLoading
      // Delay before showing the loading component. Default: 200ms.
      // delay: 200,
      // A component to use if the load fails
      // errorComponent: ErrorComponent,
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: Infinity.
      // timeout: 3000
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createElementVNode(
            "div",
            {
              ref_key: "rootComponent",
              ref: rootComponent,
              id: "spotify-panel"
            },
            null,
            512
            /* NEED_PATCH */
          ),
          createVNode(unref(PlayerComponent), {
            player: unref(spotifyPlayer),
            defaultVolume: _ctx.defaultVolume / 100,
            allowControls: _ctx.allowControls
          }, null, 8, ["player", "defaultVolume", "allowControls"])
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

var PanelComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel.vue"]]);

var e0 = definePanel({
  id: "directus-spotify",
  name: "Spotify",
  icon: "library_music",
  description: "Control your Spotify music from within Directus!",
  component: PanelComponent,
  options: [
    {
      field: "apiToken",
      name: "API Token",
      type: "text",
      meta: {
        note: "Retrieve your 1H token from https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started",
        interface: "input",
        width: "full"
      }
    },
    {
      field: "streamName",
      name: "Friendly Stream Name",
      type: "string",
      meta: {
        note: "When you want to cast from Spotify, what name should appear under the cast options?",
        interface: "input",
        width: "full"
      },
      schema: {
        default_value: "Directus"
      }
    },
    {
      field: "allowControls",
      name: "Allow Controls",
      type: "boolean",
      meta: {
        note: "Should the media controls be displayed, or should it only show the media information.",
        interface: "toggle",
        width: "full"
      },
      schema: {
        default_value: true
      }
    },
    {
      field: "defaultVolume",
      name: "Allow Controls",
      type: "string",
      meta: {
        note: "What volume (0-100) should be the default when this player is connected to?",
        interface: "string",
        width: "full"
      },
      schema: {
        default_value: 0
      }
    }
  ],
  minWidth: 20,
  minHeight: 22
});

const interfaces = [];const displays = [];const layouts = [];const modules = [];const panels = [e0];const operations = [];

export { displays, interfaces, layouts, modules, operations, panels };
