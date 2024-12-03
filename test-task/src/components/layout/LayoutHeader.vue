<script setup lang="ts">
import LogoIcon from '@/components/icons/navigation/LogoIcon.vue';
import MemoIcon from '@/components/icons/navigation/MemoIcon.vue';
import PluginIcon from '@/components/icons/navigation/PluginIcon.vue';
import SettingsIcon from '@/components/icons/navigation/SettingsIcon.vue';
import CoinIcon from '@/components/icons/navigation/CoinIcon.vue';
import FolderIcon from '@/components/icons/navigation/FolderIcon.vue';
import PlayIcon from '@/components/icons/navigation/PlayIcon.vue';
import UnionIcon from '@/components/icons/navigation/UnionIcon.vue';
import CalendarIcon from '@/components/icons/navigation/CalendarIcon.vue';

const siteMenu = [
  {
    link: "/",
    title: "Memo",
    icon: MemoIcon,
  },
  {
    link: "/",
    title: "Plugin",
    icon: PluginIcon,
  },
  {
    link: "/",
    title: "Settings",
    icon: SettingsIcon,
  }
];

const dataMenu = [
  {
    link: "/",
    title: "Coin",
    icon: CoinIcon,
  },
  {
    link: "/",
    title: "Folder",
    icon: FolderIcon,
  },
];

const logicMenu = [
  {
    link: "/logic",
    title: "Logic",
    icon: PlayIcon,
  },
  {
    link: "/",
    title: "Union",
    icon: UnionIcon,
  },
  {
    link: "/",
    title: "Calendar",
    icon: CalendarIcon,
  },
];
</script>

<template>
  <header class="layout-header">
    <RouterLink class="layout-header__logo-link" to="/">
      <LogoIcon class="layout-header__logo-icon" />
    </RouterLink>

    <nav>
      <ul class="layout-header__nav-list nav-list">
        <li class="nav-list__item nav-list__item--caption">
          Сайт
        </li>
        <li v-for="item in siteMenu" :key="item.title">
          <RouterLink class="nav-list__link" :to="item.link">
            <component :is="item.icon" class="nav-list__icon" />
          </RouterLink>
        </li>

        <li class="nav-list__item nav-list__item--caption">
            Данные
        </li>
        <li v-for="item in dataMenu" :key="item.title">
          <RouterLink class="nav-list__link" :to="item.link">
            <component :is="item.icon" class="nav-list__icon" />
          </RouterLink>
        </li>

        <li class="nav-list__item nav-list__item--caption">
          Логика
        </li>
        <li v-for="item in logicMenu " :key="item.title">
          <RouterLink class="nav-list__link" :to="item.link">
            <component :is="item.icon" class="nav-list__icon" />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.layout-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  padding-top: 23px;
}

.layout-header__logo-link {
  display: block;
  margin-bottom: 33px;
  color: var(--accent-color);
  transition: color ease-in-out 0.1s;

  &:hover {
    color: var(--accent-color-hover);
  }
}

.nav-list__item--caption {
  text-align: center;
  color: var(--text-color-gray);
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 6px;

  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);

  &:first-child {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
}

.nav-list__link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  color: var(--text-color-primary);
  transition:
    background-color ease-in-out 0.1s,
    color ease-in-out 0.1s;
  border-radius: 4px;

  &:hover {
    background-color: var(--bg-white-hover);
  }
}
.nav-list__link.router-link-exact-active {
  background-color: var(--bg-white-active);
  cursor: default;
}

.nav-list__icon {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
