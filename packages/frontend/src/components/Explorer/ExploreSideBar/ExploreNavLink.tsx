import { InlineErrorType, SummaryExplore } from '@lightdash/common';
import {
    Anchor,
    Box,
    Highlight,
    NavLink,
    Tooltip,
    Transition,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
    IconAlertTriangle,
    IconInfoCircle,
    IconTable,
} from '@tabler/icons-react';
import React from 'react';
import MantineIcon from '../../common/MantineIcon';

type ExploreNavLinkProps = {
    explore: SummaryExplore;
    query?: string;
    onClick: () => void;
};

const ExploreNavLink: React.FC<ExploreNavLinkProps> = ({
    explore,
    query,
    onClick,
}: ExploreNavLinkProps) => {
    const { ref, hovered } = useHover<HTMLButtonElement>();

    if ('errors' in explore) {
        const showNoDimensionsIcon = explore.errors.every(
            (error) => error.type === InlineErrorType.NO_DIMENSIONS_FOUND,
        );
        const errorMessage = explore.errors
            .map((error) => error.message)
            .join('\n');

        return (
            <Tooltip
                withArrow
                withinPortal
                position="right"
                label={errorMessage}
            >
                <Box>
                    <NavLink
                        role="listitem"
                        disabled
                        icon={<MantineIcon icon={IconTable} size="lg" />}
                        label={
                            <Highlight highlight={query ?? ''}>
                                {explore.label}
                            </Highlight>
                        }
                        rightSection={
                            showNoDimensionsIcon ? (
                                <Anchor
                                    role="button"
                                    href="https://docs.lightdash.com/guides/how-to-create-dimensions"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <MantineIcon
                                        icon={IconInfoCircle}
                                        color="gray.6"
                                        size="lg"
                                    />
                                </Anchor>
                            ) : (
                                <MantineIcon
                                    icon={IconAlertTriangle}
                                    size="lg"
                                    color="yellow.9"
                                />
                            )
                        }
                    />
                </Box>
            </Tooltip>
        );
    }

    return (
        <NavLink
            ref={ref}
            role="listitem"
            icon={<MantineIcon icon={IconTable} size="lg" color="gray.7" />}
            onClick={onClick}
            label={
                <Highlight highlight={query ?? ''}>{explore.label}</Highlight>
            }
            rightSection={
                <Transition mounted={hovered} transition="fade">
                    {(styles) => (
                        <Tooltip
                            withArrow
                            withinPortal
                            position="right"
                            label={explore.description}
                        >
                            <MantineIcon
                                icon={IconInfoCircle}
                                color="gray.6"
                                size="lg"
                                style={styles}
                            />
                        </Tooltip>
                    )}
                </Transition>
            }
        />
    );
};

export default ExploreNavLink;