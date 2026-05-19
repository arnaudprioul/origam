<template>
	<origam-tooltip
			v-model="openState"
			:open-on-hover="false"
			:open-on-click="true"
			:close-on-content-click="false"
			location="top"
			content-class="origam-media-config-menu__surface"
	>
		<template #activator="{ props: activatorProps }">
			<button
					v-bind="activatorProps"
					type="button"
					class="origam-media-config-menu__btn"
					:class="btnClasses"
					:style="style"
					:aria-label="settingsLabel"
					:data-cy="dataCy"
			>
				<origam-icon
						:icon="COG_ICON"
						aria-hidden="true"
				/>
			</button>
		</template>
		<div
				class="origam-media-config-menu"
				:data-cy="surfaceDataCy"
		>
			<template v-if="sectionState === 'main'">
				<button
						v-if="hasQualityOptions"
						type="button"
						class="origam-media-config-menu__row"
						:data-cy="qualityOpenDataCy"
						@click="onOpenQualitySection"
				>
					<span class="origam-media-config-menu__row-label">{{ qualityLabel }}</span>
					<span class="origam-media-config-menu__row-value">{{ formattedQuality }}</span>
					<span
							class="origam-media-config-menu__row-arrow"
							aria-hidden="true"
					>›</span>
				</button>
				<button
						v-if="hasPlaybackRates"
						type="button"
						class="origam-media-config-menu__row"
						:data-cy="speedOpenDataCy"
						@click="onOpenSpeedSection"
				>
					<span class="origam-media-config-menu__row-label">{{ speedLabel }}</span>
					<span class="origam-media-config-menu__row-value">{{ formattedPlaybackRate }}</span>
					<span
							class="origam-media-config-menu__row-arrow"
							aria-hidden="true"
					>›</span>
				</button>
				<a
						v-if="canDownload"
						:href="downloadUrl as string"
						:download="downloadFilename ?? resolvedDownloadFilename"
						rel="noopener"
						class="origam-media-config-menu__row origam-media-config-menu__row--action"
						:data-cy="downloadDataCy"
						@click="onDownloadClick($event)"
				>
					<span
							class="origam-media-config-menu__row-icon"
							aria-hidden="true"
					>
						<origam-icon :icon="DOWNLOAD_ICON" />
					</span>
					<span class="origam-media-config-menu__row-label">{{ downloadLabel }}</span>
				</a>
				<slot
						name="configExtra"
						v-bind="configExtraBindings"
				/>
			</template>

			<template v-else-if="sectionState === 'speed'">
				<button
						type="button"
						class="origam-media-config-menu__row origam-media-config-menu__row--back"
						:data-cy="backDataCy"
						@click="onBackToMain"
				>
					<span
							class="origam-media-config-menu__row-arrow origam-media-config-menu__row-arrow--back"
							aria-hidden="true"
					>‹</span>
					<span class="origam-media-config-menu__row-label">{{ speedLabel }}</span>
				</button>
				<button
						v-for="rate in playbackRates"
						:key="rate"
						type="button"
						class="origam-media-config-menu__item"
						:class="{ 'origam-media-config-menu__item--active': isActivePlaybackRate(rate) }"
						:data-cy="rateDataCy(rate)"
						@click="onPlaybackRateClick(rate)"
				>
					{{ playbackRateLabel(rate) }}
				</button>
			</template>

			<template v-else-if="sectionState === 'quality'">
				<button
						type="button"
						class="origam-media-config-menu__row origam-media-config-menu__row--back"
						:data-cy="backDataCy"
						@click="onBackToMain"
				>
					<span
							class="origam-media-config-menu__row-arrow origam-media-config-menu__row-arrow--back"
							aria-hidden="true"
					>‹</span>
					<span class="origam-media-config-menu__row-label">{{ qualityLabel }}</span>
				</button>
				<button
						v-for="q in qualityOptions"
						:key="q.quality"
						type="button"
						class="origam-media-config-menu__item"
						:class="{ 'origam-media-config-menu__item--active': isActiveQuality(q.quality) }"
						:data-cy="qualityDataCy(q.quality)"
						@click="onQualityClick(q.quality)"
				>
					{{ q.label }}
				</button>
			</template>
		</div>
	</origam-tooltip>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, useSlots, watch } from 'vue'

	import { OrigamIcon } from '../Icon'
	import { OrigamTooltip } from '../Tooltip'

	import { MDI_ICONS } from '../../enums'

	import type {
		IMediaConfigMenuEmits,
		IMediaConfigMenuProps,
		IMediaConfigMenuSlots
	} from '../../interfaces'

	import type { TMediaConfigSection } from '../../types'

	const props = withDefaults(defineProps<IMediaConfigMenuProps>(), {
		open: undefined,
		section: undefined,
		qualityOptions: () => [],
		currentQuality: null,
		downloadable: false,
		downloadUrl: null,
		downloadFilename: undefined,
		dataCy: 'origam-media-config-menu'
	})

	const emit = defineEmits<IMediaConfigMenuEmits>()

	defineSlots<IMediaConfigMenuSlots>()

	const slots = useSlots()

	const COG_ICON = MDI_ICONS.COG
	const DOWNLOAD_ICON = MDI_ICONS.DOWNLOAD

	const internalOpen = ref<boolean>(false)
	const internalSection = ref<TMediaConfigSection>('main')

	const openState = computed<boolean>({
		get: () => props.open ?? internalOpen.value,
		set: (next) => {
			internalOpen.value = next
			emit('update:open', next)
		}
	})

	const sectionState = computed<TMediaConfigSection>({
		get: () => props.section ?? internalSection.value,
		set: (next) => {
			internalSection.value = next
			emit('update:section', next)
		}
	})

	watch(openState, (open) => {
		if (!open) sectionState.value = 'main'
	})

	const hasQualityOptions = computed<boolean>(() => props.qualityOptions.length >= 2)
	const hasPlaybackRates = computed<boolean>(() => props.playbackRates.length > 1)
	const canDownload = computed<boolean>(() => Boolean(props.downloadable) && Boolean(props.downloadUrl))

	const closeMenu = (): void => {
		openState.value = false
	}

	const configExtraBindings = computed(() => ({ closeMenu }))

	const onOpenQualitySection = (): void => {
		sectionState.value = 'quality'
	}

	const onOpenSpeedSection = (): void => {
		sectionState.value = 'speed'
	}

	const onBackToMain = (): void => {
		sectionState.value = 'main'
	}

	const btnClasses = computed(() => [
		{ 'origam-media-config-menu__btn--active': openState.value },
		props.class
	])

	const surfaceDataCy = computed<string>(() => `${props.dataCy}-menu`)
	const speedOpenDataCy = computed<string>(() => `${props.dataCy}-open-speed`)
	const qualityOpenDataCy = computed<string>(() => `${props.dataCy}-open-quality`)
	const downloadDataCy = computed<string>(() => `${props.dataCy}-download`)
	const backDataCy = computed<string>(() => `${props.dataCy}-back`)

	function rateDataCy (rate: number): string {
		return `${props.dataCy}-rate-${rate}`
	}

	function qualityDataCy (quality: string): string {
		return `${props.dataCy}-quality-${quality}`
	}

	const formattedPlaybackRate = computed<string>(() => {
		const r = props.playbackRate
		if (Math.abs(r - 1) < 0.01) return props.normalSpeedLabel
		return `${r}×`
	})

	function isActivePlaybackRate (rate: number): boolean {
		return Math.abs(props.playbackRate - rate) < 0.01
	}

	function playbackRateLabel (rate: number): string {
		return rate === 1 ? props.normalSpeedLabel : `${rate}×`
	}

	function onPlaybackRateClick (rate: number): void {
		emit('update:playbackRate', rate)
		closeMenu()
	}

	const formattedQuality = computed<string>(() => {
		if (!props.currentQuality) return ''
		const match = props.qualityOptions.find((q) => q.quality === props.currentQuality)
		return match?.label ?? props.currentQuality
	})

	function isActiveQuality (quality: string): boolean {
		return props.currentQuality === quality
	}

	function onQualityClick (quality: string): void {
		emit('quality-change', quality)
		closeMenu()
	}

	const isSameOriginOrLocal = (raw: string): boolean => {
		if (raw.startsWith('data:') || raw.startsWith('blob:')) return true
		try {
			const u = new URL(raw, window.location.href)
			return u.origin === window.location.origin
		} catch {
			return true
		}
	}

	async function forceDownloadViaBlob (url: string, filename: string): Promise<boolean> {
		try {
			const response = await fetch(url, { mode: 'cors', credentials: 'omit' })
			if (!response.ok) return false
			const blob = await response.blob()
			const blobUrl = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = blobUrl
			a.download = filename
			a.rel = 'noopener'
			a.style.display = 'none'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000)
			return true
		} catch {
			return false
		}
	}

	function onDownloadClick (event: MouseEvent): void {
		if (!canDownload.value) return
		const url = props.downloadUrl as string | null
		if (!url) return
		const filename = props.downloadFilename ?? resolvedDownloadFilename.value

		closeMenu()
		emit('download', event)

		if (isSameOriginOrLocal(url)) return

		event.preventDefault()
		void forceDownloadViaBlob(url, filename).then((ok) => {
			if (ok) return
			console.warn(
				`[origam] Could not force-download "${ url }". The CDN is cross-origin and refuses CORS, so the browser falls back to opening the file inline. Configure the CDN with \`Access-Control-Allow-Origin: *\` (or \`Content-Disposition: attachment\`) to enable real downloads.`
			)
			window.location.assign(url)
		})
	}

	const resolvedDownloadFilename = computed<string>(() => {
		if (!props.downloadUrl) return 'video'
		const last = props.downloadUrl.split('/').pop()
		if (!last) return 'video'
		return last.split('?')[0] || 'video'
	})

	const hasContent = computed<boolean>(() => {
		return Boolean(slots.configExtra)
			|| hasPlaybackRates.value
			|| hasQualityOptions.value
			|| canDownload.value
	})

	defineExpose({
		open: openState,
		section: sectionState,
		hasContent,
		closeMenu
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-media-config-menu__btn {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-media-config-menu---btn-size, 36px);
		height: var(--origam-media-config-menu---btn-size, 36px);
		border-radius: var(--origam-media-config-menu---btn-border-radius, 50%);
		cursor: pointer;
		color: var(--origam-media-config-menu---color, #ffffff);
		transition: background-color 120ms ease, transform 120ms ease, opacity 120ms ease;
		opacity: 0.95;
	}

	.origam-media-config-menu__btn:hover,
	.origam-media-config-menu__btn:focus-visible {
		opacity: 1;
		background-color: var(--origam-media-config-menu---hover-background-color, rgba(255, 255, 255, 0.12));
	}

	.origam-media-config-menu__btn:active {
		transform: scale(0.92);
	}

	.origam-media-config-menu__btn--active {
		opacity: 1;
		position: relative;
	}

	.origam-media-config-menu__btn--active::after {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--origam-media-config-menu--active---indicator-color, #ef4444);
	}

	.origam-media-config-menu__btn .origam-icon {
		font-size: var(--origam-media-config-menu---icon-size, 20px);
		line-height: 1;
	}

	:deep(.origam-media-config-menu__surface) {
		padding: 4px 0;
		min-width: 168px;
		max-width: 220px;
	}

	.origam-media-config-menu {
		display: flex;
		flex-direction: column;
		font-size: 0.75rem;
		line-height: 1.2;
	}

	.origam-media-config-menu__row {
		all: unset;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-media-config-menu__row:hover,
	.origam-media-config-menu__row:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-media-config-menu__row-label {
		flex: 1 1 auto;
		min-width: 0;
	}

	.origam-media-config-menu__row-value {
		color: rgba(255, 255, 255, 0.7);
	}

	.origam-media-config-menu__row-arrow {
		color: rgba(255, 255, 255, 0.55);
		font-size: 1rem;
		line-height: 1;
	}

	.origam-media-config-menu__row--back {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 2px;
		color: rgba(255, 255, 255, 0.85);
	}

	.origam-media-config-menu__row-arrow--back {
		font-size: 1.1rem;
	}

	.origam-media-config-menu__item {
		all: unset;
		display: flex;
		align-items: center;
		padding: 5px 12px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-media-config-menu__item:hover,
	.origam-media-config-menu__item:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-media-config-menu__item--active {
		font-weight: 600;
		color: var(--origam-color__action--primary---bg, #60a5fa);
	}
</style>
