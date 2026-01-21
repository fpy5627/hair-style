import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    HAIR_TYPES,
    HAIR_LENGTHS,
    HAIR_TYPE_LABELS,
    HAIR_LENGTH_LABELS,
    getCombinationSEO,
    getSegmentSEO,
    HairType,
    HairLength
} from '@/data/mens-hairstyles-p-seo';
import { getHairstyleBySlug, getAllHairstyleSlugs } from '@/data/hairstyles-men';
import { HairstyleLibraryGrid } from '@/components/blocks/hairstyle/HairstyleLibraryGrid';
import { CategoryTryOnHeader } from '@/components/blocks/hairstyle/CategoryTryOnHeader';
import HairstyleDetailView from './HairstyleDetailView';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: {
        locale: string;
        segment: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { segment, locale } = params;

    const isType = HAIR_TYPES.includes(segment as any);
    const isLength = HAIR_LENGTHS.includes(segment as any);

    if (isType || isLength) {
        const seo = getSegmentSEO(segment as any);
        const isZh = locale === 'zh';
        return {
            title: seo.title,
            description: seo.description,
            alternates: {
                canonical: `/${locale}/hairstyles-for-men/${segment}`,
            }
        };
    }

    const hairstyle = getHairstyleBySlug(segment);
    if (hairstyle) {
        return {
            title: hairstyle.metaTitle,
            description: hairstyle.metaDescription,
            alternates: {
                canonical: `/${locale}/hairstyles-for-men/${segment}`,
            }
        };
    }

    return { title: 'Page Not Found' };
}

export async function generateStaticParams() {
    const params: { segment: string }[] = [];

    // Add types
    HAIR_TYPES.forEach(type => params.push({ segment: type }));

    // Add lengths
    HAIR_LENGTHS.forEach(length => params.push({ segment: length }));

    // Add specific styles
    const styles = getAllHairstyleSlugs();
    styles.forEach(slug => params.push({ segment: slug }));

    return params;
}

export default function HairstyleSegmentPage({ params }: Props) {
    const { segment } = params;

    const isType = HAIR_TYPES.includes(segment as any);
    const isLength = HAIR_LENGTHS.includes(segment as any);
    const hairstyle = getHairstyleBySlug(segment);

    if (isType || isLength) {
        const seo = getSegmentSEO(segment as any);
        const isZh = params.locale === 'zh';
        const label = isType
            ? (isZh ? HAIR_TYPE_LABELS[segment as HairType].zh : HAIR_TYPE_LABELS[segment as HairType].en)
            : (isZh ? HAIR_LENGTH_LABELS[segment as HairLength].zh : HAIR_LENGTH_LABELS[segment as HairLength].en);

        const title = isZh ? seo.h1Zh : seo.h1;
        const intro = isZh ? seo.introZh : seo.intro;

        return (
            <div className="min-h-screen bg-white">
                <CategoryTryOnHeader
                    title={title}
                    description={intro}
                    categoryLabel={label}
                    categoryType={isType ? 'type' : 'length'}
                    segment={segment}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <HairstyleLibraryGrid
                        initialGender="male"
                        initialHairType={isType ? segment as any : 'all'}
                        initialLength={isLength ? segment as any : 'all'}
                        title={isZh ? `探索最佳 ${label} 发型` : `Discover Best ${label} Hairstyles`}
                        description={isZh ? `精心挑选的 ${label} 风格，由我们的 AI 科学匹配，适合各种脸型。` : `Hand-picked ${label} styles scientifically matched by our AI to suit various face shapes.`}
                    />
                </div>
            </div>
        );
    }

    if (hairstyle) {
        return <HairstyleDetailView hairstyle={hairstyle} />;
    }

    notFound();
}
