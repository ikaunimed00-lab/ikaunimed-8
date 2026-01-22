<?php

namespace App\Helpers;

/**
 * AdPlacement Helper
 * 
 * Helper untuk manajemen penempatan iklan di berbagai halaman
 * Memudahkan untuk toggle ads on/off dan konfigurasi slot
 */
class AdPlacement
{
    /**
     * Config untuk ad slots
     */
    private static $config = [
        'enabled' => true,
        'sidebar' => [
            'desktop_only' => true,
            'sticky' => true,
            'show_second_slot' => true,
        ],
        'inline' => [
            'after_paragraph' => 3, // Sisipkan setelah paragraf ke-3
            'enabled' => true,
        ],
        'list' => [
            'positions' => [5, 10], // Sisipkan setelah item ke-5 dan ke-10
            'enabled' => true,
        ],
    ];

    /**
     * Cek apakah ads enabled
     */
    public static function isEnabled(): bool
    {
        return self::$config['enabled'] ?? true;
    }

    /**
     * Cek apakah sidebar ads enabled
     */
    public static function isSidebarEnabled(): bool
    {
        return self::isEnabled() && (self::$config['sidebar']['enabled'] ?? true);
    }

    /**
     * Cek apakah inline ads enabled
     */
    public static function isInlineEnabled(): bool
    {
        return self::isEnabled() && (self::$config['inline']['enabled'] ?? true);
    }

    /**
     * Cek apakah list ads enabled
     */
    public static function isListAdEnabled(): bool
    {
        return self::isEnabled() && (self::$config['list']['enabled'] ?? true);
    }

    /**
     * Get posisi untuk inline ads
     */
    public static function getInlinePosition(): int
    {
        return self::$config['inline']['after_paragraph'] ?? 3;
    }

    /**
     * Get posisi untuk list ads
     */
    public static function getListAdPositions(): array
    {
        return self::$config['list']['positions'] ?? [5, 10];
    }

    /**
     * Cek apakah perlu tampilkan ad setelah item ke-n
     */
    public static function shouldShowListAdAfter(int $itemNumber): bool
    {
        if (!self::isListAdEnabled()) {
            return false;
        }

        return in_array($itemNumber, self::getListAdPositions());
    }

    /**
     * Get semua config
     */
    public static function getConfig(): array
    {
        return self::$config;
    }

    /**
     * Update config (untuk testing atau runtime changes)
     */
    public static function setConfig(array $config): void
    {
        self::$config = array_merge(self::$config, $config);
    }

    /**
     * Enable/Disable all ads
     */
    public static function setEnabled(bool $enabled): void
    {
        self::$config['enabled'] = $enabled;
    }

    /**
     * Enable/Disable sidebar ads
     */
    public static function setSidebarEnabled(bool $enabled): void
    {
        self::$config['sidebar']['enabled'] = $enabled;
    }

    /**
     * Enable/Disable inline ads
     */
    public static function setInlineEnabled(bool $enabled): void
    {
        self::$config['inline']['enabled'] = $enabled;
    }

    /**
     * Enable/Disable list ads
     */
    public static function setListAdEnabled(bool $enabled): void
    {
        self::$config['list']['enabled'] = $enabled;
    }
}
