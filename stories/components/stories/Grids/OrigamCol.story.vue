<template>
  <Story
    group="components"
    title="Grids/OrigamCol"
  >
    <!--
      Pattern mirrored from OrigamBtn.story.vue:
        • one <Variant> per orthogonal concern
        • Playground at the end exposes everything together

      Note: every <origam-row> is wrapped in <origam-container> on
      purpose. <OrigamRow> applies negative inline margins and would
      otherwise overflow the viewport, producing an unwanted horizontal
      scrollbar in the Histoire iframe.
    -->

    <!-- ════════════ COLS (1..12 / auto) ════════════ -->
    <Variant
      title="Cols"
      :init-state="() => useStoryInitState<{ cols?: TCols }>({ cols: '6' })"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row :justify="JUSTIFY.SPACE_BETWEEN">
            <!--
              Guard against NaN / Infinity / 0:
                • cols='auto' or true → Number() = NaN → fallback to 3 cards
                • cols missing / 0    → division by zero → fallback to 3 cards
            -->
            <origam-col
              v-for="n in (Number(state.cols) > 0 ? Math.floor(12 / Number(state.cols)) : 3)"
              :key="n"
              :cols="state.cols"
            >
              <div class="demo-cell">cols={{ state.cols }} ({{ n }})</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.cols" title="cols" :options="colsList"/>
      </template>
    </Variant>

    <!-- ════════════ BREAKPOINTS (sm/md/lg/xl/xxl) ════════════ -->
    <Variant
      title="Breakpoints"
      :init-state="() => useStoryInitState<{
					cols?: TCols
					sm?: TCols
					md?: TCols
					lg?: TCols
				}>({ cols: '12', sm: '6', md: '4', lg: '3' })"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.cols" title="cols" :options="colsList"/>
        <HstSelect v-model="state.sm" title="sm" :options="colsList"/>
        <HstSelect v-model="state.md" title="md" :options="colsList"/>
        <HstSelect v-model="state.lg" title="lg" :options="colsList"/>
      </template>
    </Variant>

    <!-- ════════════ OFFSET ════════════ -->
    <Variant
      title="Offset"
      :init-state="() => useStoryInitState<{ cols?: TCols, offset?: TCols }>({ cols: '4', offset: '2' as TCols })"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row>
            <origam-col :cols="state.cols" :offset="state.offset as Omit<TCols, '12'>">
              <div class="demo-cell">offset</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.cols" title="cols" :options="colsList"/>
        <HstSelect v-model="state.offset" title="offset" :options="colsList"/>
      </template>
    </Variant>

    <!-- ════════════ ORDER ════════════ -->
    <Variant
      title="Order"
      :init-state="() => useStoryInitState<{ orderA?: number, orderB?: number }>({ orderA: 2, orderB: 1 })"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row>
            <origam-col cols="6" :order="state.orderA">
              <div class="demo-cell">A (order={{ state.orderA }})</div>
            </origam-col>
            <origam-col cols="6" :order="state.orderB">
              <div class="demo-cell">B (order={{ state.orderB }})</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.orderA" title="orderA"/>
        <HstNumber v-model="state.orderB" title="orderB"/>
      </template>
    </Variant>

    <!-- ════════════ ALIGN (self) ════════════ -->
    <Variant
      title="Align (align-self)"
      :init-state="() => useStoryInitState<IAlignProps>({})"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row align="start" style="min-height: 120px; background: var(--origam-color-surface-overlay, #ececec);">
            <origam-col cols="4">
              <div class="demo-cell">parent (align=start)</div>
            </origam-col>
            <origam-col cols="4" :align="state.align">
              <div class="demo-cell">align={{ state.align ?? '(unset)' }}</div>
            </origam-col>
            <origam-col cols="4">
              <div class="demo-cell">parent</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.align" title="align" :options="alignList"/>
      </template>
    </Variant>

    <!-- ════════════ TAG (polymorphism) ════════════ -->
    <Variant
      title="Tag"
      :init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row>
            <origam-col cols="12" :tag="state.tag">
              <div class="demo-cell">tag={{ state.tag }}</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.tag" title="tag" :options="tagList"/>
      </template>
    </Variant>

    <!-- ════════════ SLOT: default ════════════ -->
    <Variant title="Slot — default">
      <origam-container>
        <origam-row>
          <origam-col cols="6">
            <div class="demo-cell">
              <strong>Custom default slot</strong>
              <p>Anything goes.</p>
            </div>
          </origam-col>
        </origam-row>
      </origam-container>
    </Variant>

    <!-- ════════════ PLAYGROUND ════════════ -->
    <Variant
      title="Playground"
      :init-state="() => useStoryInitState<IColProps>({
					cols: '6',
					md: '4',
					lg: '3',
					offset: undefined,
					order: undefined,
					align: undefined,
					tag: 'div'
				})"
    >
      <template #default="{ state }">
        <origam-container>
          <origam-row>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
            <origam-col v-bind="state">
              <div class="demo-cell">card</div>
            </origam-col>
          </origam-row>
        </origam-container>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.cols" title="cols" :options="colsList"/>
        <HstSelect v-model="state.sm" title="sm" :options="colsList"/>
        <HstSelect v-model="state.md" title="md" :options="colsList"/>
        <HstSelect v-model="state.lg" title="lg" :options="colsList"/>
        <HstSelect v-model="state.xl" title="xl" :options="colsList"/>
        <HstSelect v-model="state.offset" title="offset" :options="colsList"/>
        <HstNumber v-model="state.order" title="order"/>
        <HstSelect v-model="state.align" title="align" :options="alignList"/>
        <HstSelect v-model="state.tag" title="tag" :options="tagList"/>
      </template>
    </Variant>
  </Story>
</template>

<script
  lang="ts"
  setup
>
  import { OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
  import { JUSTIFY } from "@origam/enums";
  import type { IAlignProps, IColProps } from '@origam/interfaces'
  import type { TCols } from '@origam/types'

  import { useStoryInitState } from '@stories/composables'
  import {
    alignList,
    colsList,
    tagList
  } from '@stories/const'
</script>

<style scoped>
  .demo-cell {
    padding: 12px;
    background: var(--origam-color-surface-default, #fff);
    border: 1px solid var(--origam-color-border-default, #e5e5e5);
    border-radius: 4px;
    text-align: center;
    color: var(--origam-color-text-onColor, #000);
  }
</style>
