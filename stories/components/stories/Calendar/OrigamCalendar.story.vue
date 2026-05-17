<template>
	<Story
			group="components"
			title="Calendar/OrigamCalendar"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					view: 'month',
					firstDayOfWeek: 1,
					timeFormat: '24h',
					selectable: true,
					weekendHighlight: true,
					showWeekNumbers: false,
					locale: 'en-US'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="calendar-playground"
				>
					<origam-calendar
							v-model:view="state.view"
							v-model:current-date="currentDate"
							:events="FIXTURE_EVENTS"
							:first-day-of-week="Number(state.firstDayOfWeek)"
							:time-format="state.timeFormat"
							:selectable="Boolean(state.selectable)"
							:weekend-highlight="Boolean(state.weekendHighlight)"
							:show-week-numbers="Boolean(state.showWeekNumbers)"
							:locale="state.locale"
							:category-colors="CATEGORY_COLORS"
							data-cy="calendar-playground-cal"
							@event-click="onEventClick"
							@date-click="onDateClick"
							@range-select="onRangeSelect"
							@create-event-request="onCreateEventRequest"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.view"
						title="view"
						:options="VIEW_OPTIONS"
				/>
				<HstSelect
						v-model="state.firstDayOfWeek"
						title="firstDayOfWeek"
						:options="FIRST_DAY_OPTIONS"
				/>
				<HstSelect
						v-model="state.timeFormat"
						title="timeFormat"
						:options="TIME_FORMAT_OPTIONS"
				/>
				<HstText
						v-model="state.locale"
						title="locale"
				/>
				<HstCheckbox
						v-model="state.selectable"
						title="selectable"
				/>
				<HstCheckbox
						v-model="state.weekendHighlight"
						title="weekendHighlight"
				/>
				<HstCheckbox
						v-model="state.showWeekNumbers"
						title="showWeekNumbers"
				/>
			</template>
		</Variant>

		<Variant title="Prop — view (month / week / day / agenda)">
			<div
					class="story-shell"
					data-cy="calendar-views"
			>
				<p class="hint">
					The four built-in views share a single event-source and toolbar
					contract; pass the same <code>events</code> prop and switch via
					<code>v-model:view</code> or the toolbar tabs.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>month</strong>
						<origam-calendar
								view="month"
								:current-date="FIXTURE_REFERENCE_DATE"
								:events="FIXTURE_EVENTS"
								data-cy="calendar-view-month"
						/>
					</div>
					<div class="story-col">
						<strong>week</strong>
						<origam-calendar
								view="week"
								:current-date="FIXTURE_REFERENCE_DATE"
								:events="FIXTURE_EVENTS"
								data-cy="calendar-view-week"
						/>
					</div>
					<div class="story-col">
						<strong>day</strong>
						<origam-calendar
								view="day"
								:current-date="FIXTURE_REFERENCE_DATE"
								:events="FIXTURE_EVENTS"
								data-cy="calendar-view-day"
						/>
					</div>
					<div class="story-col">
						<strong>agenda</strong>
						<origam-calendar
								view="agenda"
								:current-date="FIXTURE_REFERENCE_DATE"
								:events="FIXTURE_EVENTS"
								data-cy="calendar-view-agenda"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — events (15+ events fixture)">
			<div
					class="story-shell"
					data-cy="calendar-events"
			>
				<p class="hint">
					Fixture spans 6 weeks with 15+ events across 4 categories. Hover
					a chip to see its title; click to receive the <code>event-click</code>
					payload (logged below).
				</p>
				<origam-calendar
						view="month"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="FIXTURE_EVENTS"
						:category-colors="CATEGORY_COLORS"
						data-cy="calendar-events-cal"
						@event-click="onEventClick"
				/>
			</div>
		</Variant>

		<Variant title="Prop — events recurring (rrule weekly Mon Wed Fri)">
			<div
					class="story-shell"
					data-cy="calendar-recurring"
			>
				<p class="hint">
					Single event with <code>rrule="FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=12"</code>
					— the calendar expands it to 12 chips spread across Mon/Wed/Fri.
				</p>
				<origam-calendar
						view="month"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="RECURRING_FIXTURE"
						:category-colors="CATEGORY_COLORS"
						data-cy="calendar-recurring-cal"
				/>
			</div>
		</Variant>

		<Variant title="Prop — categoryColors (5 categories, 5 colors)">
			<div
					class="story-shell"
					data-cy="calendar-category-colors"
			>
				<p class="hint">
					Each event reads its colour from <code>categoryColors[event.category]</code>.
					Passing a <code>TIntent</code> picks the token rail; passing a raw
					colour value (hex / rgb) wins over the token.
				</p>
				<origam-calendar
						view="month"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="CATEGORY_FIXTURE"
						:category-colors="CATEGORY_COLORS"
						data-cy="calendar-category-cal"
				/>
			</div>
		</Variant>

		<Variant title="Slot — event (custom event card)">
			<div
					class="story-shell"
					data-cy="calendar-slot-event"
			>
				<p class="hint">
					The <code>#event</code> slot replaces the default chip — receives
					the full event, the active view, and <code>isPast / isToday</code>
					flags.
				</p>
				<origam-calendar
						view="agenda"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="FIXTURE_EVENTS"
						data-cy="calendar-slot-event-cal"
				>
					<template #event="{ event, isPast: pastFlag }">
						<span
								class="custom-event"
								:class="{ 'custom-event--past': pastFlag }"
						>
							<span class="custom-event__dot" />
							<strong>{{ event.title }}</strong>
							<em>{{ event.category }}</em>
						</span>
					</template>
				</origam-calendar>
			</div>
		</Variant>

		<Variant title="Slot — day (custom day cell)">
			<div
					class="story-shell"
					data-cy="calendar-slot-day"
			>
				<p class="hint">
					The <code>#day</code> slot replaces a month cell wholesale. Useful
					for compact stats or external badges.
				</p>
				<origam-calendar
						view="month"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="FIXTURE_EVENTS"
						data-cy="calendar-slot-day-cal"
				>
					<template #day="{ date, events, isToday: todayFlag }">
						<div class="custom-day">
							<span :class="{ 'custom-day__today': todayFlag }">
								{{ date.getDate() }}
							</span>
							<span
									v-if="events.length > 0"
									class="custom-day__count"
									data-cy="custom-day-count"
							>
								{{ events.length }}
							</span>
						</div>
					</template>
				</origam-calendar>
			</div>
		</Variant>

		<Variant title="Slot — empty (custom CTA when agenda is empty)">
			<div
					class="story-shell"
					data-cy="calendar-slot-empty"
			>
				<p class="hint">
					No events in the range → the <code>#empty</code> slot renders.
				</p>
				<origam-calendar
						view="agenda"
						:current-date="EMPTY_REFERENCE_DATE"
						:events="[]"
						data-cy="calendar-slot-empty-cal"
				>
					<template #empty>
						<button
								type="button"
								class="custom-empty-cta"
								data-cy="custom-empty-cta"
						>
							+ Create your first event
						</button>
					</template>
				</origam-calendar>
			</div>
		</Variant>

		<Variant title="Emit — event-click, date-click, range-select">
			<div
					class="story-shell"
					data-cy="calendar-emits"
			>
				<p class="hint">
					Interact with the calendar — every emit appends to the log below.
				</p>
				<origam-calendar
						view="month"
						:current-date="FIXTURE_REFERENCE_DATE"
						:events="FIXTURE_EVENTS"
						data-cy="calendar-emits-cal"
						@event-click="logEmit('event-click', $event)"
						@date-click="logEmit('date-click', $event)"
						@range-select="(start, end) => logEmit('range-select', { start, end })"
						@create-event-request="(start, end) => logEmit('create-event-request', { start, end })"
				/>
				<dl
						class="emit-log"
						data-cy="calendar-emit-log"
				>
					<div
							v-for="(entry, index) in emitLog"
							:key="index"
					>
						<dt>{{ entry.name }}</dt>
						<dd>{{ entry.value }}</dd>
					</div>
				</dl>
			</div>
		</Variant>

		<Variant
				title="Emit — navigate / view-change / update:*"
				:init-state="() => useStoryInitState({ view: 'month', currentDate: new Date().toISOString(), navCount: 0, viewChangeCount: 0 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="cal-emit-navigation">
					<origam-calendar
							v-model:view="state.view"
							v-model:current-date="state.currentDate"
							:events="[]"
							@navigate="state.navCount++"
							@view-change="state.viewChangeCount++"
							data-cy="cal-emit-navigation-player"
					/>
					<dl class="story-counters">
						<div><dt>view (v-model)</dt><dd data-cy="cal-emit-view">{{ state.view }}</dd></div>
						<div><dt>currentDate (v-model)</dt><dd data-cy="cal-emit-current-date">{{ new Date(state.currentDate).toISOString().slice(0, 10) }}</dd></div>
						<div><dt>@navigate fires</dt><dd data-cy="cal-emit-nav-count">{{ state.navCount }}</dd></div>
						<div><dt>@view-change fires</dt><dd data-cy="cal-emit-view-change-count">{{ state.viewChangeCount }}</dd></div>
					</dl>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamCalendar } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const VIEW_OPTIONS = [
		{ value: 'month', label: 'month' },
		{ value: 'week', label: 'week' },
		{ value: 'day', label: 'day' },
		{ value: 'agenda', label: 'agenda' }
	]

	const FIRST_DAY_OPTIONS = [
		{ value: '0', label: 'Sunday (0)' },
		{ value: '1', label: 'Monday (1)' },
		{ value: '6', label: 'Saturday (6)' }
	]

	const TIME_FORMAT_OPTIONS = [
		{ value: '24h', label: '24h' },
		{ value: '12h', label: '12h' }
	]

	const CATEGORY_COLORS: Record<string, string> = {
		meeting: 'primary',
		focus: 'success',
		personal: 'warning',
		offsite: 'danger',
		travel: 'info'
	}

	const FIXTURE_REFERENCE_DATE = new Date(2026, 4, 14) // 2026-05-14
	const EMPTY_REFERENCE_DATE = new Date(2030, 0, 15)

	const FIXTURE_EVENTS = [
		{ id: 1, title: 'Sprint planning', start: new Date(2026, 4, 4, 10, 0), end: new Date(2026, 4, 4, 11, 30), category: 'meeting' },
		{ id: 2, title: 'Design review', start: new Date(2026, 4, 6, 14, 0), end: new Date(2026, 4, 6, 15, 0), category: 'meeting' },
		{ id: 3, title: 'Focus block', start: new Date(2026, 4, 7, 9, 0), end: new Date(2026, 4, 7, 12, 0), category: 'focus' },
		{ id: 4, title: 'Lunch with Cécile', start: new Date(2026, 4, 8, 12, 30), end: new Date(2026, 4, 8, 13, 30), category: 'personal' },
		{ id: 5, title: 'All-hands', start: new Date(2026, 4, 11, 16, 0), end: new Date(2026, 4, 11, 17, 0), category: 'meeting' },
		{ id: 6, title: 'Token sync', start: new Date(2026, 4, 13, 10, 0), end: new Date(2026, 4, 13, 10, 30), category: 'meeting' },
		{ id: 7, title: 'Doctor appointment', start: new Date(2026, 4, 14, 8, 30), end: new Date(2026, 4, 14, 9, 30), category: 'personal' },
		{ id: 8, title: 'Pair programming', start: new Date(2026, 4, 14, 14, 0), end: new Date(2026, 4, 14, 16, 0), category: 'focus' },
		{ id: 9, title: 'Off-site Paris', start: new Date(2026, 4, 15, 9, 0), end: new Date(2026, 4, 15, 18, 0), category: 'offsite' },
		{ id: 10, title: 'Off-site Paris', start: new Date(2026, 4, 16, 9, 0), end: new Date(2026, 4, 16, 18, 0), category: 'offsite' },
		{ id: 11, title: 'Train to Lyon', start: new Date(2026, 4, 18, 7, 30), end: new Date(2026, 4, 18, 10, 0), category: 'travel' },
		{ id: 12, title: 'Demo day', start: new Date(2026, 4, 20, 15, 0), end: new Date(2026, 4, 20, 17, 0), category: 'meeting' },
		{ id: 13, title: 'Retrospective', start: new Date(2026, 4, 22, 11, 0), end: new Date(2026, 4, 22, 12, 0), category: 'meeting' },
		{ id: 14, title: 'Tokens hack', start: new Date(2026, 4, 25, 9, 0), end: new Date(2026, 4, 25, 17, 0), category: 'focus' },
		{ id: 15, title: 'Birthday', start: new Date(2026, 4, 28, 19, 0), category: 'personal', allDay: true }
	]

	const RECURRING_FIXTURE = [
		{
			id: 'r1',
			title: 'Standup',
			start: new Date(2026, 4, 4, 10, 0),
			end: new Date(2026, 4, 4, 10, 15),
			category: 'meeting',
			rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=12'
		}
	]

	const CATEGORY_FIXTURE = [
		{ id: 'c1', title: 'meeting category', start: new Date(2026, 4, 4, 10, 0), end: new Date(2026, 4, 4, 11, 0), category: 'meeting' },
		{ id: 'c2', title: 'focus category', start: new Date(2026, 4, 7, 9, 0), end: new Date(2026, 4, 7, 12, 0), category: 'focus' },
		{ id: 'c3', title: 'personal category', start: new Date(2026, 4, 11, 19, 0), end: new Date(2026, 4, 11, 20, 0), category: 'personal' },
		{ id: 'c4', title: 'offsite category', start: new Date(2026, 4, 14, 9, 0), end: new Date(2026, 4, 14, 18, 0), category: 'offsite' },
		{ id: 'c5', title: 'travel category', start: new Date(2026, 4, 20, 7, 30), end: new Date(2026, 4, 20, 10, 0), category: 'travel' }
	]

	const currentDate = ref(FIXTURE_REFERENCE_DATE)

	type TLog = { name: string; value: string }
	const emitLog = ref<Array<TLog>>([])

	function logEmit (name: string, payload: unknown): void {
		emitLog.value.unshift({ name, value: JSON.stringify(payload, null, 0).slice(0, 120) })
		if (emitLog.value.length > 8) emitLog.value.pop()
	}

	function onEventClick (event: unknown): void { logEmit('event-click', event) }
	function onDateClick (date: Date): void { logEmit('date-click', date) }
	function onRangeSelect (start: Date, end: Date): void { logEmit('range-select', { start, end }) }
	function onCreateEventRequest (start: Date, end: Date): void { logEmit('create-event-request', { start, end }) }
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 1200px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
		gap: 16px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.custom-event {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font: 0.875rem/1.2 system-ui, sans-serif;
	}

	.custom-event--past {
		opacity: 0.55;
	}

	.custom-event__dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background-color: currentColor;
	}

	.custom-day {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: flex-start;
	}

	.custom-day__today {
		font-weight: 700;
		text-decoration: underline;
	}

	.custom-day__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 22px;
		padding: 0 6px;
		border-radius: 11px;
		background-color: var(--origam-color__action--primary---bg, #3b82f6);
		color: var(--origam-color__action--primary---fg, #ffffff);
		font-size: 0.6875rem;
		font-weight: 600;
	}

	.custom-empty-cta {
		all: unset;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 10px 16px;
		border-radius: 8px;
		background-color: var(--origam-color__action--primary---bg, #3b82f6);
		color: var(--origam-color__action--primary---fg, #ffffff);
		font: 600 0.875rem/1 system-ui, sans-serif;
		cursor: pointer;
	}

	.emit-log {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font: 0.75rem/1.2 ui-monospace, monospace;
	}

	.emit-log > div {
		display: flex;
		gap: 8px;
		align-items: baseline;
	}

	.emit-log dt {
		font-weight: 600;
		color: var(--origam-color__action--primary---bg, #3b82f6);
		min-width: 140px;
	}

	.emit-log dd {
		margin: 0;
		color: var(--origam-color__text---secondary, #555);
		word-break: break-all;
	}
</style>
