<template>
  <div class="portfolio-asset">
    <div class="portfolio-asset-body" :class="assetStatus(item.percent_change)">
      <div class="portfolio-asset-title">
        <img :src="imageUrl(item.id)" v-bind:alt="item.asset.name" @error="imageLoadError">
        <h4>{{ item.asset.name }}
          <small>{{ item.asset.symbol }}</small>
        </h4>
        <span v-on:click="removeAsset"><i class="fa fa-trash" aria-hidden="true"></i></span>
      </div>
      <div class="portfolio-asset-content">
        <p class="portfolio-asset-value">{{ item.value_usd | formatCurrency }}</p>
      </div>
      <div class="portfolio-asset-footer">
        <ul>
          <li>
            <strong>Holdings</strong><br>
            {{ item.amount | formatCurrency }}
          </li>
          <li>
            <strong>Price</strong><br>
            {{ item.price_usd | formatCurrency }}
          </li>
          <li>
            <strong>% Change</strong><br>
            <strong class="percent-change" :class="assetStatus(item.percent_change)">{{ item.percent_change | formatPercent }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatCurrency, formatPercent } from '../../utils';
  import EventBus from '../../event-bus';

  export default {
    name: 'portfolio-asset-card',
    props: {
      item: {},
    },
    filters: {
      formatCurrency(value) {
        return formatCurrency(value, false, 'fiat');
      },
      formatPercent(value) {
        return formatPercent(value, true);
      },
    },
    methods: {
      imageUrl(id) {
        return `../static/img/icons/${id}.png`;
      },
      assetStatus(value) {
        let str = '';
        if (value > 0) {
          str = 'is-up';
        } else if (value < 0) {
          str = 'is-down';
        }
        return str;
      },
      imageLoadError(e) {
        e.target.src = '../static/img/icon-fallback.png';
      },
      removeAsset() {
        EventBus.$emit('remove-asset', this.item.id);
      },
    },
  };
</script>
