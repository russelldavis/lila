import { h } from 'snabbdom'
import { VNode } from 'snabbdom/vnode'

import { DasherCtrl, DasherData, Mode } from './dasher'
import { view as pingView } from './ping'
import { bind } from './util'

export default function(ctrl: DasherCtrl, d: DasherData): VNode {

  const trans = ctrl.trans();

  const profile = h(
    'a.user_link.online.text.is-green',
    linkCfg(`/@/${d.name}`, d.patron ? '' : ''),
    trans.noarg('profile'));

  const inbox = d.kid ? null : h(
    'a.text',
    linkCfg('/inbox', 'e'),
    trans.noarg('inbox'));

  const prefs = h(
    'a.text',
    linkCfg('/pref/game-display', '%', ctrl.opts.playing ? {target: '_blank'} : undefined),
    trans.noarg('preferences'));

  const coach = !d.coach ? null : h(
    'a.text',
    linkCfg('/coach/edit', ':'),
    'Coach manager');

  const langs = h(
    'a.sub',
    modeCfg(ctrl, 'langs'),
    'Language')

  const logout = h(
    'a.text',
    linkCfg('/logout', 'w'),
    trans.noarg('logOut'));

  return h('div', [
    h('div.links', [
      profile,
      inbox,
      prefs,
      coach,
      langs,
      logout
    ]),
    pingView(ctrl.ping)
  ]);
}

function linkCfg(href: string, icon: string, more: any = undefined): any {
  const cfg: any = {
    attrs: {
      href: href,
      'data-icon': icon
    }
  };
  if (more) for(let i in more) cfg.attrs[i] = more[i];
  return cfg;
}

function modeCfg(ctrl: DasherCtrl, m: Mode): any {
  return {
    hook: bind('click', () => ctrl.setMode(m)),
    attrs: {
      'data-icon': 'H'
    }
  };
}
